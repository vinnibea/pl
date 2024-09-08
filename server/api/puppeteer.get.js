// import puppeteer from 'puppeteer';
// import axios from 'axios';
// import sharp from 'sharp';
// import { default as Creditor } from '../schemas/creditor';

// export default defineEventHandler(async (event) => {
//     //parser
//     const browser = await puppeteer.launch({
//         headless: true,
//         defaultViewport: null,
//     });
//     const page = await browser.newPage();

//     await page.goto("https://fincult.kz/novyie-onlajn-zajmyi-v-kazaxstane", {
//         waitUntil: "domcontentloaded",
//     });

//     const items_to_save = await page.evaluate(async function () {
//         const cards = document.querySelectorAll('.catalog_mfo_item');
//         const cards_array = Array.from(cards);

//         const return_array = cards_array.map((el) => {
//             const imageURL = el.querySelector('.mfo_item_image img').src
//             const title = el.querySelector('.mfo_item_title h2').innerText;
//             const subtitle = el.querySelector('.mfo_item_license').innerText;

//             const blocks = Array.from(el.querySelectorAll('.content_block')).map(b => {
//                 const block_title = b.querySelector('.content_block_title').innerText;
//                 const block_value = b.querySelector('.content_block_value').innerText;
//                 return { title: block_title, value: block_value };
//             })
//             const advantages =  Array.from(el.querySelectorAll('.mfo_item_advantage')).map(inner_el => {
//                     const inner = inner_el.querySelector('.advantage_text').innerText;
//                     console.log(inner)
//                     return inner;
//                 });
            

//             return {
//                 imageURL, title, subtitle, blocks, advantages
//             }
//         });

//         return return_array;
//     });
//     await browser.close();
//     //завантаження зображення, трансформація в формат .webp, створення буферу
//     items_to_save.map(async (el, i) => {

//         try {
//             const response = await axios({
//                 url: el.imageURL,
//                 method: 'GET',
//                 responseType: 'arraybuffer',
//             });

//             // Збереження зображення на диск
//             const buffer = Buffer.from(response.data)
//             const buffer_webp = await sharp(buffer)
//                 .webp()
//                 .toBuffer();


//             const img_to_base64 = buffer_webp.toString('base64');
//             const output_src = `data:image/webp;base64,${img_to_base64}`
//             console.log(el)
       
//             const new_el = {
//                 ...el,
//                 src: output_src,
//             }
//             await Creditor.create(new_el);
            
//         } catch (error) {
//             throw createError({
//                 statusMessage: 'Error parse'
//             })
//         }
//     })



//     return {
//         statusMessage: 'Proccess ended'
//     }
// })