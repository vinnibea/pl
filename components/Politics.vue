<script setup>
import { useMobileStore } from "~/stores/MobileMenu.js";
const store = useMobileStore();
import { useAccountStore } from "~/stores/accountStore";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
});

const public_offer =  [
  {
    title: "Umowa użytkownika",
    content:
      "Niniejsza umowa reguluje stosunki między Licencjodawcą a Użytkownikiem w zakresie korzystania z funkcji Serwisu. Umowa stanowi umowę adhezyjną. Prosimy uważnie przeczytać treść umowy. Jeśli nie zgadzacie się z warunkami, Sp. z o.o. GotówkaMax zaleca powstrzymanie się od korzystania z serwisu.",
  },

  {
    title: "Definicje",
    list: [
      {
        title:
          "1.1. Licencjodawca – Spółka z o.o. GotówkaMax, NIP: 5261040827, której przysługują wyłączne prawa do Serwisu i która udziela Użytkownikowi prawa do korzystania z funkcji Serwisu na podstawie licencji niewyłącznej.",
      },
      {
        title:
          "1.2. Użytkownik – osoba fizyczna posiadająca pełną zdolność do czynności prawnych, która przystąpiła do warunków Umowy i korzysta z funkcji Serwisu.",
      },
      {
        title:
          "1.3. Serwis – zbiór informacji, tekstów, elementów graficznych, projektu, oprogramowania, baz danych i innych rezultatów działalności intelektualnej, dostępnych w Internecie.",
      },
      {
        title:
          "1.4. Konto użytkownika – funkcja Serwisu dostępna dla Użytkownika po rejestracji, umożliwiająca dostęp do płatnych funkcji po dokonaniu opłaty.",
      },
      {
        title:
          "1.5. Kredytodawca – podmiot wymieniony w Załączniku nr 1 do Umowy, z którym Licencjodawca zawarł umowę i który ma prawo wysyłać Użytkownikowi powiadomienia i oferty dotyczące zawarcia Umowy pożyczki.",
      },
      {
        title:
          "1.5.1. Partner – podmiot wymieniony w Załączniku nr 1 do Umowy, z którym Licencjodawca zawarł umowę i który ma prawo wysyłać powiadomienia i oferty Użytkownikowi.",
      },
      {
        title:
          "1.6. Ocena kredytowa – ocena zdolności kredytowej Użytkownika przeprowadzana przez funkcje Serwisu na podstawie dostarczonych informacji.",
      },
      {
        title:
          "1.7. Umowa o udzielenie mikrokredytu – umowa zawarta między Użytkownikiem a Kredytodawcą, dotycząca udzielenia pożyczki na zasadach odpłatności, terminowości i zwrotności.",
      },
      {
        title:
          "1.8. Terminy niezdefiniowane w Umowie są interpretowane zgodnie z obowiązującymi przepisami prawa Rzeczypospolitej Polskiej.",
      },
    ],
  },

  {
    title: "Przedmiot umowy",
    list: [
      {
        title:
          "2.1. Licencjodawca udziela Użytkownikowi prawa do korzystania z funkcji Serwisu, a po uiszczeniu opłaty licencyjnej – do korzystania z płatnych funkcji Serwisu.",
      },
      {
        title:
          "2.2. Prawa do korzystania z funkcji Serwisu są udzielane Użytkownikowi z zachowaniem przez Licencjodawcę prawa do udzielania licencji innym osobom.",
      },
      {
        title: "2.3. Dozwolone sposoby korzystania z Serwisu",
        sublist: [
          {
            content:
              "2.3.1. Dostęp do informacji zamieszczonych w Serwisie. Część informacji może być dostępna dopiero po uzyskaniu dostępu do Konta użytkownika i płatnych funkcji.",
          },
          {
            content:
              "2.3.2. Przekazanie przez Użytkownika pełnych i prawdziwych danych o sobie.",
          },
          {
            content: "2.3.3. Rejestracja i logowanie w Serwisie.",
          },
          {
            content: "2.3.4. Współpraca z Licencjodawcą.",
          },
          {
            content:
              "2.3.5. Przekazywanie informacji Licencjodawcy za pomocą formularzy w Serwisie.",
          },
          {
            content: "2.3.6. Dostęp do płatnych funkcji Serwisu.",
          },
          {
            content:
              "2.3.7. Korzystanie z innych funkcji Serwisu zgodnie z ich przeznaczeniem.",
          },
        ],
      },
      {
        title:
          "2.4. Użytkownikowi nie przysługują żadne inne prawa do Serwisu, poza tymi wymienionymi w punkcie 2.3.",
      },
      {
        title:
          "2.5. Użytkownik nie ma prawa podejmować działań, w tym zmiany kodu, modyfikacji, dekompilacji oraz stosowania metod inżynierii społecznej w celu uzyskania dostępu do danych osobowych innych Użytkowników.",
      },
      {
        title:
          "2.6. Okres korzystania z funkcji Serwisu: do rozwiązania Umowy lub wygaśnięcia wyłącznych praw do Serwisu. W przypadku płatnych funkcji okres wynosi 5 dni od momentu dokonania opłaty.",
      },
      {
        title:
          "2.7. Okres korzystania z płatnych funkcji: 5 dni od dnia dokonania opłaty licencyjnej.",
      },
      {
        title: "2.8. Obszar korzystania z Serwisu – Rzeczpospolita Polska.",
      },
      {
        title:
          "2.9. Warunki Umowy obejmują aktualizacje i nowe wersje Serwisu.",
      },
      {
        title:
          "2.10. Żadne postanowienie Umowy nie może być interpretowane jako przeniesienie wyłącznych praw lub licencji na cały Serwis lub jego części.",
      },
      {
        title:
          "2.11. Informacje w Serwisie są wynikiem działalności intelektualnej Licencjodawcy. Wszelkie prawa do tych informacji przysługują Licencjodawcy, chyba że ustalono inaczej.",
      },
    ],
  },

  {
    title: "Warunki płatności",
    list: [
      {
        title:
          "3.1. Opłata za korzystanie z Serwisu wynosi 9,99 euro. Okres próbny, w którym opłata nie jest pobierana od klienta, wynosi 5 dni od rozpoczęcia subskrypcji. Kwota ta zostanie pobrana za 5 dni korzystania od momentu złożenia wniosku. Jeśli subskrypcja nie zostanie anulowana, opłata będzie pobierana automatycznie.",
      },
      {
        title:
          "3.2. Jeżeli usługa nie jest już potrzebna (np. po otrzymaniu mikrokredytu), Użytkownik może samodzielnie anulować subskrypcję w dowolnym momencie. Subskrypcję można anulować za pomocą odpowiedniej funkcji.",
      },
      {
        title:
          "3.3. Strona internetowa używa plików cookie w celu świadczenia usług. Warunki przechowywania plików cookie można skonfigurować w przeglądarce. W celu usunięcia danych osobowych należy wysłać wiadomość e-mail na adres experts@gotowkamax.pro z prośbą o usunięcie danych. Wiadomość powinna zawierać sformułowanie: „Proszę o usunięcie moich danych osobowych”. Ta operacja jest nieodwracalna.",
      },
    ],
  },

  {
    title: "Funkcjonalność serwisu",
    list: [
      {
        title: "4.1. Funkcjonalność Serwisu przeznaczona jest do:",
        sublist: [
          {
            content: "4.1.1. rejestracji, autoryzacji Użytkownika w Serwisie;",
          },
          {
            content:
              "4.1.2. gromadzenia informacji o Użytkowniku, pozyskiwania informacji od osób trzecich, z systemów informacyjnych i baz danych, które należą do osób trzecich;",
          },
          {
            content: "4.1.3. oceny informacji przekazanych przez Użytkownika;",
          },
          {
            content:
              "4.1.4. przekazywania informacji o Użytkowniku Kredytodawcom na podstawie oceny;",
          },
          {
            content:
              "4.1.5. przekazywania Użytkownikowi informacji o Kredytodawcach, którzy podjęli wstępną decyzję o zawarciu Umowy o pożyczkę;",
          },
          {
            content:
              "4.1.6. przesyłania Użytkownikowi informacji o promocjach, ofertach, usługach Licencjodawcy, Kredytodawców za pośrednictwem kanałów telekomunikacyjnych;",
          },
          {
            content:
              "4.1.7. przekazywania Użytkownikowi informacji pozyskanych o nim od osób trzecich, z systemów informacyjnych i baz danych, które należą do osób trzecich;",
          },
          {
            content:
              "4.1.8. udostępniania Użytkownikowi informacji zamieszczonych przez Licencjodawcę w Serwisie.",
          },
        ],
      },
      {
        title:
          "4.2. W ramach realizacji pkt 4.1.2 i 4.1.7 Umowy licencyjnej, Użytkownik wyraża zgodę na przekazanie swoich danych osobowych do “Pierwszego Biura Kredytowego” oraz zgadza się na uzyskanie swojego osobistego ratingu kredytowego, sporządzonego przez “Pierwsze Biuro Kredytowe”, z wykorzystaniem Serwisu.",
      },
      {
        title:
          "4.3. Użytkownik nie ma prawa korzystać z Serwisu w sposób nieprzewidziany Umową licencyjną.",
      },
      {
        title:
          "4.4. Licencjodawca udostępnia funkcjonalność Serwisu nieodpłatnie, z wyjątkiem dostępu do płatnych funkcji Serwisu. Usługa uważana jest za zrealizowaną w momencie uzyskania dostępu do Serwisu. Płatne funkcje Serwisu obejmują następujące sekcje Panelu użytkownika:",
        list: [
          {
            title:
              "4.4.1. Udostępnianie i aktualizowanie informacji w sekcjach Panelu użytkownika:",
            sublist: [
              {
                content:
                  "4.4.1.1. Rating kredytowy. W tej sekcji Panelu użytkownika widoczne są informacje o ratingu kredytowym przypisanym Użytkownikowi. Rating kredytowy jest przypisywany po rejestracji na podstawie informacji przekazanych przez Użytkownika oraz algorytmów zawartych w funkcjach Serwisu. Rating kredytowy ma charakter informacyjny i nie jest wiążący dla Kredytodawcy.",
              },
              {
                content:
                  "4.4.1.2. Zadłużenie. W tej sekcji Panelu użytkownika widoczne są informacje na temat postępowań egzekucyjnych, w których Użytkownik występuje (lub występował) jako dłużnik. Informacje określone w pkt 4.2 Umowy licencyjnej są udostępniane i aktualizowane w dniu opłacenia opłaty licencyjnej.",
              },
            ],
          },
          {
            content:
              "4.4.2. Dostęp do informacji zamieszczonych w sekcjach Panelu użytkownika, które Licencjodawca udostępnia Użytkownikowi po opłaceniu opłaty licencyjnej. Dostęp do informacji określonych w pkt 4.2 Umowy licencyjnej jest udzielany na okres określony w pkt 2.7 Umowy licencyjnej.",
          },
        ],
      },
      {
        title:
          "4.5. Po rejestracji w Serwisie informacje o Użytkowniku są automatycznie przekazywane Kredytodawcom, których wymagania spełnia Użytkownik, w celu podjęcia wstępnej decyzji o zawarciu Umowy o udzielenie mikropożyczki, a także Partnerom, którzy z kolei przekazują informacje Kredytodawcom.",
      },
      {
        title:
          "4.6. Po przekazaniu informacji o Użytkowniku Kredytodawcom, wyświetlany jest status: «W trakcie przetwarzania».",
      },
      {
        title:
          "4.7. Jeśli informacje o Użytkowniku dotarły do Kredytodawcy, wyświetlany jest status «Wysłane».",
      },
      {
        title:
          "4.8. Jeśli informacje o Użytkowniku nie dotarły do Kredytodawcy, wyświetlany jest status «Błąd». W takim przypadku należy sprawdzić informacje w Panelu użytkownika i ponownie je przesłać.",
      },
      {
        title:
          "4.9. Użytkownik może wybrać dowolnego Kredytodawcę, który jest wskazany w Panelu użytkownika i który podjął pozytywną wstępną decyzję o zawarciu Umowy o udzielenie mikropożyczki, i przejść na stronę Kredytodawcy w celu zawarcia Umowy o udzielenie mikropożyczki. Umowa o udzielenie mikropożyczki jest zawierana zgodnie z wewnętrznymi regulacjami Kredytodawcy.",
      },
      {
        title:
          "4.10. Użytkownik nie ma prawa żądać od Kredytodawcy zawarcia z nim Umowy o udzielenie mikropożyczki. Kredytodawca może odmówić zawarcia Umowy o udzielenie mikropożyczki.",
      },
      {
        title:
          "4.11. Licencjodawca, Partnerzy i Kredytodawcy podczas korzystania z funkcji Serwisu mogą przesyłać na adres e-mail i numer telefonu Użytkownika materiały informacyjne i reklamowe, które mogą zawierać reklamę towarów i usług Licencjodawcy oraz Kredytodawców. Użytkownik ma prawo zrezygnować z otrzymywania materiałów informacyjnych i reklamowych, klikając hiperłącze znajdujące się w wiadomości e-mail obok tekstu «Aby zrezygnować z tej subskrypcji, kliknij tutaj» i potwierdzając swoje życzenie kliknięciem przycisku «Wykonaj», lub przesyłając wniosek do Licencjodawcy o rezygnację z otrzymywania reklam, poprzez wypełnienie formularza w Serwisie.",
      },
      {
        title:
          "4.12. Strony nie sporządzają aktu przekazania loginu i hasła, numeru zgłoszenia dostępu do funkcji Panelu użytkownika.",
      },
      {
        title:
          "4.13. Użytkownik nie sporządza i nie jest zobowiązany do przekazywania Licencjodawcy raportu o korzystaniu z Serwisu.",
      },
    ],
  },
  {
    title: "Opłata licencyjna",
    list: [
      {
        title:
          "6.1. Licencjodawca zapewnia Użytkownikowi prawo do korzystania z funkcjonalności Serwisu bezpłatnie, z wyjątkiem płatnych funkcji Serwisu.",
      },
      {
        title:
          "6.2. Opłata licencyjna dokonywana jest na zasadzie pełnej przedpłaty. Koszt usług Serwisu wynosi 9,99 EUR. Okres próbny, w trakcie którego użytkownik nie jest obciążany opłatami, wynosi 5 dni od rozpoczęcia subskrypcji.",
      },
      {
        title:
          "6.3. Opłata licencyjna i okres płatnego korzystania z Serwisu są komunikowane Użytkownikowi przed dokonaniem płatności. Kwota opłaty licencyjnej może zostać zmieniona przez Licencjodawcę. Zmiany wchodzą w życie z początkiem kolejnego okresu płatnego.",
      },
      {
        title:
          "6.4. Kwota opłaty licencyjnej jest automatycznie pobierana z rachunku bankowego Użytkownika, o ile znajdują się na nim wystarczające środki. Pobranie opłaty licencyjnej odbywa się cyklicznie po weryfikacji danych dotyczących rachunku bankowego, do momentu rezygnacji z płatnej funkcji. Licencjodawca ma prawo do ponownych prób pobrania płatności w przypadku niepowodzenia transakcji.",
      },
      {
        title:
          "6.5. Użytkownik może zrezygnować z dostępu do płatnych funkcji poprzez wypełnienie formularza w Serwisie. Jeśli rezygnacja nie zostanie zgłoszona, kwota opłaty licencyjnej będzie automatycznie pobierana z rachunku bankowego.",
      },
      {
        title:
          "6.6. W przypadku złożenia rezygnacji z płatnych funkcji przed zakończeniem okresu dostępu, opłata licencyjna i proporcjonalna jej część nie podlegają zwrotowi.",
      },
      {
        title:
          "6.7. Paragon za dokonanie opłaty licencyjnej jest przesyłany Użytkownikowi na adres e-mail podany przy rejestracji.",
      },
      {
        title:
          "6.8. Zasady zwrotów i anulowania opłaty licencyjnej są udostępniane w Serwisie.",
      },
    ],
  },
  {
    title: "Prawa i obowiązki Licencjodawcy",
    list: [
      {
        title:
          "7.1. Licencjodawca ma prawo do umieszczania w Serwisie bloków reklamowych, banerów i ogłoszeń w dowolnych obszarach Serwisu bez dodatkowej zgody Użytkownika.",
      },
      {
        title:
          "7.2. Licencjodawca ma prawo zablokować dostęp do funkcji Serwisu w przypadku uzasadnionych roszczeń osób trzecich, wykrycia działań niezgodnych z prawem lub naruszenia warunków Umowy Użytkownika.",
      },
      {
        title:
          "7.3. Licencjodawca ma prawo ograniczyć dostęp do części funkcji Serwisu na potrzeby prac konserwacyjnych i technicznych serwera.",
      },
      {
        title:
          "7.4. Licencjodawca zapewnia dostęp do funkcji Serwisu przez całą dobę, z wyjątkiem okresów, w których odbywają się prace konserwacyjne i techniczne.",
      },
      {
        title:
          "7.5. Licencjodawca ma prawo wstrzymać działanie Serwisu i ograniczyć dostęp do jego funkcji w celu przeprowadzenia prac konserwacyjnych i technicznych, które w miarę możliwości są wykonywane w porze nocnej lub w dni wolne od pracy, zgodnie ze strefą czasową Licencjodawcy.",
      },
      {
        title:
          "7.6. Licencjodawca ma prawo wprowadzać zmiany w funkcjach Serwisu i wydawać jego zaktualizowane wersje.",
      },
    ],
  },
  {
    title: "Prawa i obowiązki Użytkownika",
    list: [
      {
        title:
          "8.1. Użytkownik ma prawo do zmiany informacji podanych przy rejestracji w swoim Panelu Użytkownika.",
      },
      {
        title:
          "8.2. Użytkownik upoważnia Licencjodawcę do przekazywania informacji o nim Kredytodawcom lub Partnerom w celu rozważenia możliwości zawarcia Umowy pożyczki.",
      },
      {
        title:
          "8.3. Użytkownik zobowiązuje się do zapobiegania nieautoryzowanemu dostępowi do swojego loginu i hasła oraz niezwłocznie informować Licencjodawcę o przypadkach naruszenia bezpieczeństwa.",
      },
    ],
  },
  {
    title: "Odpowiedzialność",
    list: [
      {
        content:
          "9.1. Licencjodawca świadczy Serwis Użytkownikowi „tak jak jest” (as is), zgodnie z powszechnie przyjętymi zasadami w praktyce międzynarodowej. Licencjodawca nie ponosi odpowiedzialności za problemy występujące w trakcie korzystania, aktualizacji, wsparcia i eksploatacji Serwisu (w tym problemy z kompatybilnością z innymi produktami oprogramowania, niezgodności wyników korzystania z Serwisu z oczekiwaniami Użytkownika, błędy w obliczeniach itp.). Użytkownik ponosi pełną odpowiedzialność za wszelkie negatywne konsekwencje wynikające z niekompatybilności lub konfliktów Serwisu z innymi produktami oprogramowania zainstalowanymi na jego urządzeniu.",
      },
      {
        title:
          "9.2. Użytkownik zobowiązuje się do pokrycia wszelkich strat poniesionych przez Licencjodawcę w wyniku naruszenia przez Użytkownika warunków Umowy Użytkownika.",
      },
      {
        title:
          "9.3. Licencjodawca nie ponosi odpowiedzialności wobec Użytkownika w następujących przypadkach:",
        sublist: [
          {
            content:
              "W przypadku powstania strat u Użytkownika z powodu niewykonania obowiązków przewidzianych w punkcie 10.10 Umowy Użytkownika.",
          },
          {
            content: "Za podjęcie decyzji o zawarciu Umowy pożyczki.",
          },
          {
            content:
              "Za prawdziwość informacji dostarczanych Użytkownikowi przez Kredytodawców i Partnerów.",
          },
          {
            content:
              "Za treść e-maili kierowanych do Użytkownika z informacjami o Kredytodawcach i Partnerach.",
          },
          {
            content:
              "Za wyniki odwiedzin Użytkownika zewnętrznych zasobów, do których linki mogą być zamieszczone w Serwisie.",
          },
          {
            content:
              "Za okoliczności pozostające poza kontrolą Licencjodawcy, w tym działania i zaniechania Użytkownika oraz niezgodne z prawem działania osób trzecich.",
          },
          {
            content:
              "Za brak lub niemożność nawiązania połączenia internetowego między serwerem Użytkownika a serwerem, na którym znajduje się Serwis.",
          },
          {
            content:
              "W przypadku przeprowadzania działań operacyjnych przez organy państwowe lub inne organizacje.",
          },
          {
            content:
              "W przypadku wprowadzenia regulacji rządowych (lub regulacji przez inne organizacje) dotyczących działalności gospodarczej w Internecie, które utrudniają lub uniemożliwiają wykonanie Umowy Użytkownika.",
          },
          {
            content:
              "Za naruszenie przez Użytkownika warunków Umowy Użytkownika.",
          },
          {
            content:
              "Za tymczasowy brak dostępu do funkcjonalności Serwisu lub Panelu Użytkownika w związku z pracami konserwacyjnymi oraz związane z tym straty Użytkownika.",
          },
        ],
      },
      {
        title:
          "9.4. Użytkownik ponosi pełną odpowiedzialność za wszelkie działania podejmowane za pośrednictwem swojego Panelu Użytkownika.",
      },
      {
        title:
          "9.5. Dostęp do funkcjonalności Serwisu może być ograniczony, jeśli Użytkownik korzysta z niego w systemach informacyjnych działających w warunkach niebezpiecznych lub obsługujących systemy zasilania życia, w których awaria może stanowić zagrożenie dla życia ludzi lub prowadzić do znacznych strat. Serwis może także działać niepoprawnie w przypadku zablokowania wszystkich plików cookie lub korzystania z sieci TOR.",
      },
      {
        title:
          "9.6. Licencjodawca nie ponosi odpowiedzialności wobec osób trzecich za działania Użytkownika z wykorzystaniem Serwisu, a także za niewykonanie przez Użytkownika zobowiązań wobec osób trzecich.",
      },
      {
        title:
          "9.7. Strony nie ponoszą odpowiedzialności za częściowe lub całkowite niewykonanie zobowiązań wynikających z Umowy, jeśli jest to spowodowane siłą wyższą, która wystąpiła po zawarciu Umowy, taką jak klęski żywiołowe, wojny, akty terrorystyczne lub zmiany w prawodawstwie, które uniemożliwiają wykonanie zobowiązań. Strona, która znalazła się w takiej sytuacji, zobowiązana jest do powiadomienia drugiej strony w ciągu 10 dni.",
      },
      {
        title:
          "9.8. Użytkownik ponosi odpowiedzialność za bezpieczeństwo swoich danych do logowania w Panelu Użytkownika oraz za ewentualne straty spowodowane ich nieautoryzowanym użyciem.",
      },
      {
        title:
          "9.9. W przypadku podania przez Użytkownika nieprawidłowego adresu e-mail, odpowiedzialność za niemożność otrzymania paragonów za dokonane płatności spoczywa na nim.",
      },
    ],
  },

  {
    title: "Rozwiązywanie sporów",
    list: [
      {
        title:
          "10.1. W przypadku powstania sporu między Użytkownikiem a Licencjodawcą, strony zobowiązują się do przesłania reklamacji drugiej stronie. Odpowiedź na reklamację powinna być udzielona w ciągu 20 dni roboczych od jej otrzymania.",
      },
      {
        title:
          "10.2. Jeśli spór nie może być rozwiązany w drodze reklamacji, podlega on przekazaniu do rozpatrzenia przez sąd zgodnie z prawem Rzeczypospolitej Polskiej.",
      },
    ],
  },
  {
    title: "Postanowienia końcowe",
    list: [
      {
        title:
          "11.1. Warunki Umowy Użytkownika dotyczą wszystkich Użytkowników.",
      },
      {
        title:
          "11.2. Umowa nie wymaga dwustronnego podpisu i jest ważna w formie elektronicznej.",
      },
      {
        title: "11.3. Umowa nie jest publiczną ofertą Licencjodawcy.",
      },
      {
        title:
          "11.4. Licencjodawca nie udziela pożyczek konsumenckich i nie jest stroną, poręczycielem ani beneficjentem Umowy pożyczki. Kredytodawca i Użytkownik nie mogą zgłaszać roszczeń wobec Licencjodawcy w ramach tej umowy.",
      },
      {
        title:
          "11.5. Umowa staje się wiążąca dla Użytkownika z momentem jej zaakceptowania i obowiązuje bezterminowo.",
      },
      {
        title:
          "11.6. Przekazanie praw i obowiązków wynikających z umowy bez zgody Licencjodawcy jest niedopuszczalne.",
      },
      {
        title: "11.7. Podstawy zakończenia umowy:",
        sublist: [
          {
            content:
              "Licencjodawca ma prawo odstąpić od wykonania umowy w przypadku naruszenia jej warunków przez Użytkownika.",
          },
          {
            content:
              "Użytkownik ma prawo zrezygnować z korzystania z płatnej funkcjonalności Serwisu, składając odpowiednie żądanie za pośrednictwem formularza kontaktowego na stronie.",
          },
        ],
      },
      {
        title:
          "11.8. Licencjodawca ma prawo jednostronnie wprowadzać zmiany w warunkach umowy bez konsultacji z Użytkownikiem.",
      },
      {
        title:
          "11.9. Przyjęcie zmian Umowy Użytkownika następuje poprzez autoryzację w Serwisie. Użytkownik zobowiązany jest do śledzenia zmian za każdym razem przy logowaniu.",
      },
      {
        title:
          "11.10. Jeśli Użytkownik nie zgadza się ze zmianami, jest zobowiązany do zaprzestania korzystania z Serwisu. Kontynuacja korzystania uznawana jest za zgodę na nowe warunki.",
      },
      {
        title:
          "11.11. Aktualna wersja umowy dostępna jest na stronie https://gotowkamax.eu/public-offer/",
      },
    ],
  },
  {
    title: "Płatność za usługi serwisu",
    list: [
      {
        title:
          "12.1. Opłata za korzystanie z płatnej funkcjonalności serwisu wynosi 9,99 euro. Okres próbny, w którym opłata nie jest pobierana, trwa 5 dni od rozpoczęcia subskrypcji. Użytkownik jest zobowiązany do terminowego wniesienia opłaty w celu kontynuacji korzystania z serwisu.",
      },
      {
        title:
          "12.2. Użytkownik ponosi odpowiedzialność za poprawność podawanych danych do płatności. W przypadku błędu lub niemożności dokonania płatności, dostęp do funkcjonalności może być ograniczony.",
      },
    ],
  },
  {
    title: "Kredytodawcy",
    list: [
      {
        title:
          "Mikrofinansowa Spółka «Aasa Polska»: NIP: 5272720840; Adres: 00-032 Warszawa, ul. Złota 59.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Vivus Finance»: NIP: 1132832154; Adres: 00-850 Warszawa, ul. Czerwonego Krzyża 3.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Lendon»: NIP: 1234567890; Adres: 02-643 Warszawa, ul. Al. Jerozolimskie 54.",
      },
      {
        title:
          "Mikrofinansowa Spółka «SMS Kredyt»: NIP: 1234567891; Adres: 01-004 Warszawa, ul. Nowy Świat 29.",
      },
      {
        title:
          "Mikrofinansowa Spółka «NetCredit»: NIP: 5242531961; Adres: 00-844 Warszawa, ul. Biała 1.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Wonga»: NIP: 9512400354; Adres: 02-676 Warszawa, ul. Chmielna 12.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Kredyt OK»: NIP: 6793089300; Adres: 03-215 Warszawa, ul. Marszałkowska 100.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Zaimo»: NIP: 5272748403; Adres: 00-738 Warszawa, ul. Krucza 23.",
      },
      {
        title:
          "Mikrofinansowa Spółka «CreditAgricole»: NIP: 6020000180; Adres: 30-012 Kraków, ul. Rondo Grunwaldzkie 5.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Czesto»; NIP: 1234567892; Adres: 00-950 Poznań, ul. Piątkowska 10.",
      },
    ],
  },
  {
    title: "Partnerzy",
    list: [
      {
        title:
          "Mikrofinansowa Spółka «Finanse i Kredyty»: NIP: 1231231234; Adres: 01-002 Warszawa, ul. Świętokrzyska 30.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Kapitalna Pożyczka»: NIP: 9876543210; Adres: 02-568 Wrocław, ul. Wrocławska 12.",
      },
      {
        title:
          "Mikrofinansowa Spółka «Kredyt24»: NIP: 4567890123; Adres: 00-345 Gdańsk, ul. Długa 50.",
      },
    ],
  },
];

let pricing_offer = [
  {
    title: "Umowa Użytkownika",
    content:
      "Niniejszy dokument reguluje relacje między Licencjodawcą a Użytkownikiem podczas korzystania z funkcjonalności Serwisu. Umowa stanowi umowę adhezyjną. Prosimy o dokładne zapoznanie się z treścią dokumentu. Jeśli nie zgadzasz się z jego warunkami, Sp. z o.o. GotówkaMax.eu zaleca zaprzestanie korzystania z Serwisu.",
  },
  {
    title: "Definicje",
    list: [
      {
        title:
          "1.1. Licencjodawca – Sp. z o.o. GotówkaMax.eu, NIP: 5261040827, posiadająca wyłączne prawa do Serwisu i udzielająca Użytkownikowi prawa do korzystania z funkcji Serwisu na podstawie licencji niewyłącznej.",
      },
      {
        title:
          "1.2. Użytkownik – osoba fizyczna posiadająca pełne prawa obywatelskie, która akceptuje warunki niniejszej Umowy i korzysta z funkcjonalności Serwisu.",
      },
      {
        title:
          "1.3. Serwis – zbiór zasobów informacyjnych, tekstów, grafiki, oprogramowania oraz innych elementów własności intelektualnej, dostępnych przez internet pod adresem https://gotowkamax.eu.",
      },
      {
        title:
          "1.4. Konto osobiste – specjalna funkcjonalna część Serwisu, dostępna dla Użytkownika po rejestracji, która umożliwia dostęp do płatnych usług po ich opłaceniu.",
      },
      {
        title:
          "1.5. Kredytodawca – organizacja wymieniona w Załączniku nr 1 do Umowy, z którą Licencjodawca podpisał umowę, umożliwiającą Kredytodawcy wysyłanie Użytkownikowi powiadomień i ofert dotyczących zawarcia Umowy pożyczki.",
      },
      {
        title:
          "1.5.1. Partner – organizacja wymieniona w Załączniku nr 1 do Umowy, z którą Licencjodawca podpisał umowę umożliwiającą wysyłanie Użytkownikowi powiadomień i ofert.",
      },
      {
        title:
          "1.6. Ocena kredytowa – wskaźnik zdolności kredytowej Użytkownika, obliczany na podstawie informacji dostarczonych przez funkcjonalność Serwisu.",
      },
      {
        title:
          "1.7. Umowa o udzielenie mikropożyczki – umowa zawierana między Użytkownikiem a Kredytodawcą, przewidująca udzielenie środków na warunkach odpłatności, zwrotności i terminowości.",
      },
      {
        title:
          "1.8. Terminy, które nie zostały określone w niniejszej Umowie, będą interpretowane zgodnie z prawem Rzeczypospolitej Polskiej.",
      },
    ],
  },
  {
    title: "Postanowienia ogólne",
    list: [
      {
        title:
          "2.1. Niniejsze Zasady dotyczą wszystkich transakcji związanych z przekazywaniem środków pieniężnych z rachunku bankowego Płatnika na rachunek bankowy Licencjodawcy w celu opłacenia usług.",
      },
      {
        title:
          "2.2. Jeśli Użytkownik dokonuje regularnych płatności, zasady dotyczące zwrotu mogą być stosowane jedynie do płatności wykonanych w ciągu ostatnich 14 dni kalendarzowych przed złożeniem wniosku o zwrot.",
      },
    ],
  },
  {
    title: "Procedura anulowania płatności",
    list: [
      {
        title: "3.1. Anulowanie płatności możliwe jest w następujących przypadkach:",
        sublist: [
          {
            content:
              "Jeśli karta, której dane zostały użyte do opłacenia usług Licencjodawcy, została zgubiona przez Płatnika przed dokonaniem płatności.",
          },
          {
            content:
              "Płatność została dokonana bez wiedzy Płatnika lub wskutek działań osób trzecich.",
          },
        ],
      },
      {
        title:
          "3.2. Aby anulować płatność, Płatnik powinien skontaktować się z Bankiem wydawcą karty lub operatorem systemu płatności.",
      },
      {
        title:
          "3.3. Licencjodawca zobowiązuje się dostarczać Bankowi wydawcy karty lub operatorowi systemu płatności niezbędne informacje, aby ułatwić anulowanie płatności.",
      },
    ],
  },
  {
    title: "Procedura zwrotu płatności",
    list: [
      {
        title: "4.1. Zwrot płatności może nastąpić w następujących przypadkach:",
        sublist: [
          {
            content:
              "Pobrano kwotę wyższą niż określona w Umowie Użytkownika.",
          },
          {
            content:
              "Użytkownik nie uzyskał dostępu do płatnych usług Serwisu.",
          },
        ],
      },
      {
        title:
          "4.2. Zwrot środków jest prawem, a nie obowiązkiem Licencjodawcy.",
      },
      {
        title:
          "4.3. Użytkownik jest zobowiązany do złożenia wniosku o zwrot nie później niż 14 dni kalendarzowych od daty dokonania spornego płatności.",
      },
      {
        title:
          "4.4. Wniosek o zwrot środków należy przesłać pocztą elektroniczną na adres experts@gotowkamax.pro lub za pośrednictwem formularza w Serwisie.",
      },
    ],
  },
  {
    title: "Postanowienia końcowe",
    list: [
      {
        title:
          "5.1. Licencjodawca zastrzega sobie prawo do zmiany niniejszych Zasad dotyczących anulowania i zwrotu płatności. Zmiany wchodzą w życie z chwilą ich opublikowania w Serwisie.",
      },
      {
        title:
          "5.2. Sprawy, które nie są uregulowane w niniejszych Zasadach, będą rozstrzygane zgodnie z obowiązującym prawem Rzeczypospolitej Polskiej.",
      },
      {
        title:
          "5.3. Jeżeli którekolwiek z postanowień niniejszych Zasad zostanie uznane za nieważne, pozostałe postanowienia pozostają w mocy.",
      },
    ],
  },
];

const data_offer = [
  {
    title: "Zgoda na przetwarzanie danych osobowych",
    content:
      "Ja, osoba fizyczna, której dane zostały podane podczas rejestracji na stronie https://gotowkamax.eu/, jako podmiot danych osobowych (dalej — Podmiot), wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z warunkami Polityki przetwarzania danych osobowych Sp. z o.o. GotówkaMax.eu (NIP: 5261040827) (dalej — Operator) poprzez stronę https://gotowkamax.eu (dalej – Serwis).",
  },
  {
    title: "Zgoda na przetwarzanie danych",
    content:
      "Podmiot wyraża pełną i bezwarunkową zgodę na wszystkie warunki przetwarzania jego danych osobowych poprzez zaznaczenie pola wyboru obok tekstu „Wyrażam zgodę na przetwarzanie danych osobowych i zgadzam się z polityką przetwarzania danych osobowych” w Serwisie. Podmiot gwarantuje, że przed wyrażeniem zgody na przetwarzanie danych osobowych zapoznał się ze wszystkimi warunkami Polityki przetwarzania danych Operatora (dalej – Polityka).",
  },
  {
    title: "Zdolność do czynności prawnych i zgoda",
    content:
      "Podmiot, wyrażając zgodę na przetwarzanie danych osobowych, gwarantuje, że działa dobrowolnie, z własnej woli i w swoim interesie oraz posiada pełną zdolność do czynności prawnych.",
  },
  {
    title: "Przetwarzanie danych osobowych",
    content:
      "Na podstawie niniejszej zgody Podmiot wyraża zgodę Operatorowi na przetwarzanie swoich danych osobowych, a mianowicie:",
    sublist: [
      {
        content: "nazwisko, imię, drugie imię (jeśli dotyczy);",
      },
      {
        content: "data urodzenia;",
      },
      {
        content: "PESEL;",
      },
      {
        content: "adres e-mail;",
      },
      {
        content: "numer telefonu;",
      },
      {
        content: "pliki cookie.",
      },
    ],
  },
  {
    title: "Dane wrażliwe",
    content:
      "Operator nie przetwarza wrażliwych danych Podmiotu (biometrycznych danych osobowych, specjalnych kategorii danych osobowych).",
  },
  {
    title: "Cele przetwarzania danych",
    content:
      "Celem przetwarzania danych osobowych Podmiotu jest zawarcie i wykonanie umowy użytkownika, zgodnie z którą Sp. z o.o. GotówkaMax.eu zapewnia Podmiotowi dostęp do osobistego konta w Serwisie oraz informuje Podmiot o ofertach Sp. z o.o. GotówkaMax.eu i kredytodawców.",
  },
  {
    title: "Działania związane z danymi osobowymi",
    content:
      "Operator podczas przetwarzania danych osobowych Podmiotu wykonuje następujące czynności: gromadzenie, przechowywanie, zmiana, uzupełnianie, wykorzystywanie, anonimizowanie, blokowanie i usuwanie danych osobowych oraz inne czynności zgodnie z przepisami prawa Rzeczypospolitej Polskiej.",
  },
  {
    title: "Weryfikacja wiarygodności",
    content:
      "Podmiot zgadza się, że Operator ma prawo weryfikować prawdziwość informacji podanych przez Podmiot podczas rejestracji, za pośrednictwem otwartych źródeł danych, w tym publicznych systemów informacyjnych.",
  },
  {
    title: "Przekazywanie danych osobom trzecim",
    content:
      "Podmiot zgadza się, że Operator ma prawo przekazywać dane osobowe Podmiotu osobom trzecim (kredytodawcom, partnerom i innym podmiotom, którym przekazanie danych osobowych jest niezbędne do realizacji zobowiązań Operatora wobec Podmiotu lub do spełnienia wymogów prawa Rzeczypospolitej Polskiej), zgodnie z warunkami rozdziału 10 Polityki.",
  },
  {
    title: "Automatyzacja przetwarzania danych",
    content:
      "Operator przetwarza dane osobowe Podmiotu z użyciem narzędzi automatyzacji oraz bez ich użycia. Operator nie podejmuje żadnych decyzji mających skutki prawne wobec Podmiotu danych osobowych ani w żaden inny sposób nie narusza praw i interesów Podmiotu w trakcie przetwarzania danych z użyciem narzędzi automatyzacji.",
  },
  {
    title: "Transgraniczne przekazywanie danych",
    content:
      "Operator może przekazywać dane za granicę – na terytorium Federacji Rosyjskiej oraz Republiki Cypryjskiej. Podmiot wyraża bezwarunkową zgodę na takie transgraniczne przekazywanie.",
  },
  {
    title: "Rozpowszechnianie danych",
    content:
      "Operator nie rozpowszechnia danych osobowych Podmiotu w publicznie dostępnych źródłach.",
  },
  {
    title: "Okres obowiązywania zgody",
    content:
      "Zgoda Podmiotu na przetwarzanie jego danych osobowych obowiązuje przez okres 10 (dziesięciu) lat od dnia jej wyrażenia. Operator przed upływem tego okresu zakończy przetwarzanie danych osobowych w przypadku osiągnięcia celu określonego w zgodzie lub wcześniejszego wycofania zgody, chyba że Polityka lub prawo Rzeczypospolitej Polskiej stanowi inaczej.",
  },
  {
    title: "Wycofanie zgody",
    content:
      "Zgoda może zostać wycofana wcześniej poprzez wysłanie przez Podmiot z adresu e-mail podanego podczas rejestracji w Serwisie, na adres e-mail experts@gotowkamax.pro, wiadomości elektronicznej zawierającej żądanie usunięcia danych osobowych Podmiotu. Oświadczenie, o którym mowa w niniejszym punkcie, powinno spełniać wymagania określone w Polityce. Jeżeli Podmiot wycofa swoją zgodę, Operator natychmiast zaprzestaje przetwarzania danych osobowych Podmiotu, z wyjątkiem przypadków przewidzianych przepisami prawa Rzeczypospolitej Polskiej.",
  },
];
const data = [
  data_offer,
  public_offer,
  pricing_offer
];

onMounted(() => {
  document.body.style.overflow = 'hidden';
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto';
})

</script>

<template>
  <div
    class="max-[822px]:px-0 max-[822px]:py-0 z-50 max-[822px]:rounded-none rounded-3xl bg-white max-h-screen w-3/4 mx-auto fixed top-0 bottom-0 max-[822px]:w-full max-[822px]:mt-0 shadow-lg max-[822px]:shadow-none"
  >
    <h3
      class="mx-auto w-full text-center rounded-base max-[822px]:rounded-t-none z-50 rounded- fixed shadow-md text-xl 
      py-4 top-0 font-bold text-white bg-dark-grey max-[822px]:py-2 max-[822px]:text-[12px] max-[822px]:font-semibold"
    >
      {{ data[index][0].title }}
    </h3>
    <div 
      class="rounded-md max-[822px]:rounded-none w-full max-h-[calc(100vh)] hidden-scroll overflow-scroll py-12 z-30 max-[822px]:w-full max-[822px]:shadow-none cursor-move relative"
    >
      <div v-for="(item,i) in data[index]" :key="item.title">
        <h2 class="font-bold text-center py-2 max-[822px]:py-0" v-if="i">{{ item.title }}</h2>
        <p v-if="item.content" class="max-[822px]:text-[12px] text-justify p-2 max-[822px]:p-1">
          {{ item.content }}
        </p>
        <div v-for="(data, k) in item.list" :key="k">
          <p class="text-[12px] text-slate-900 p-1">{{ data.title || "" }}</p>
          <div v-for="(sub_data, i) in data.sublist" :key="i">
            <p class="text-[10px] text-justify pl-4 max-[822px]:pl-0 text-slate-600">{{ sub_data.content }}</p>
          </div>
        </div>
   
      </div>
      
    </div>
    <Button
      class="fixed bottom-0 z-50 right-0 min-w-full"
      :hover="'hover:bg-button-primary-hover'"
      :radius="'rounded-base max-[822px]:rounded-b-none'"
      @click="store.onPolitics(false)"
     
      >Zamknij</Button>
  </div>
</template>
<style scoped>
.hidden-scroll::-webkit-scrollbar {
  display: none;
}
</style>
