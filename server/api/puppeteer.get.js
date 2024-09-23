import puppeteer from 'puppeteer';
import axios from 'axios';
import sharp from 'sharp';
import prisma from '~/lib/prisma';


export default defineEventHandler(async (event) => {
    //parser

   if(!event.context._bot) {
    throw createError({
        statusCode: 400,
        statusMessage: 'Forbidden',
    });
   }

    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();

    await page.goto("https://nowepozabankowe.pl/", {
        waitUntil: "domcontentloaded",
    });

    const items_to_save = await page.evaluate(async function () {
        const cards = document.querySelectorAll('.ranking-table__row');
        const cards_array = Array.from(cards);

        const return_array = cards_array.map((el) => {
            const imageURL = el.querySelector('.ranking-offer__logo img').src
            // const title = el.querySelector('.mfo_item_title h2').innerText;
            // const subtitle = el.querySelector('.mfo_item_license').innerText;

            const blocks = Array.from(el.querySelectorAll('.ranking-table__cell-param')).map(b => {
                const block_title = b.querySelector('.ranking-table__cell-param-name').innerText;
                const block_value = b.querySelector('.ranking-table__cell-param-value').innerText.replace('?', '');
                return { title: block_title, value: block_value };
            })
            const advantages =  Array.from(el.querySelectorAll('.mfo_item_advantage')).map(inner_el => {
                    const inner = inner_el.querySelector('.advantage_text').innerText;
                    console.log(inner)
                    return inner;
                });
            

            return {
                imageURL, blocks
            }
        });

        return return_array;
    });
    await browser.close();
    //завантаження зображення, трансформація в формат .webp, створення буферу
    items_to_save.map(async (el, i) => {

        try {
            const response = await axios({
                url: el.imageURL,
                method: 'GET',
                responseType: 'arraybuffer',
            });

            // Збереження зображення на диск
            const buffer = Buffer.from(response.data)
            const buffer_webp = await sharp(buffer)
                .webp()
                .toBuffer();


            const img_to_base64 = buffer_webp.toString('base64');
            const output_src = `data:image/webp;base64,${img_to_base64}`
            console.log(el)
       
            const new_el = {
                ...el,
                src: output_src,
            }
            try {
                await prisma.creditor.create({
                    data: {
                        ...new_el,
                        blocks: {
                            create: new_el.blocks
                        }
                    }
            })
                // await Creditor.create(new_el);
            } catch(e) {
                console.log('DB ERROR', e)
            }
            
        } catch (error) {
            throw createError({
                statusMessage: 'Error parse'
            })
        }
    })



    return {
        statusMessage: 'Proccess ended'
    }
})