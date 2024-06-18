document.addEventListener('DOMContentLoaded', () => {
    const languageSwitchers = document.querySelectorAll('#languageSwitcher');
    i18next
        .use(i18nextBrowserLanguageDetector)
        .init({
            fallbackLng: 'en',
            debug: true,
            resources: {
                en: {
                    translation: {
                        address: "Bishkek, st. Moskovskaya, 172",
                        menu: {
                            main: "Home"
                        },
                        carousel: {
                            label:"Invest",
                            title:"Our mission is to help the environment",
                            text:"The KSE Sustainable Development Sector was created with the aim of support sustainable financing into socially and environmentally significant projects as well as stimulating the development of a green economy."
                        },
                        welcome: "Welcome",
                        description: "This is a multilingual website example."
                    }
                },
                ru: {
                    translation: {
                        address: " г. Бишкек, ул. Московская, 172",
                        menu: {
                            main: "Главная",
                            about: "О "
                        },
                        carousel: {
                            label:"Инвестируйте",
                            title:"Наша миссия - помочь экологии",
                            text:"Сектор устойчивого развития КФБ создан с целью развития устойчивого финансирования в социально и экологически значимые проекты, стимулируя развитие зеленой экономики."
                        },
                        welcome: "Добро",
                        description: "Это пример многоязычного сайта."
                    }
                }
           
                // Добавьте больше языков, если нужно
            }
        }, (err, t) => {
            if (err) return console.error(err);
            updateContent();
            setLanguageFromLocalStorage();
        });

    function updateContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = i18next.t(key);
        });
    }

    function syncCheckboxes(language) {
        languageSwitchers.forEach(languageSwitcher => {
            languageSwitcher.checked = (language === 'en');
        });
    }

    languageSwitchers.forEach(languageSwitcher => {
        languageSwitcher.addEventListener('change', () => {
            const selectedLang = languageSwitcher.checked ? 'en' : 'ru';
            i18next.changeLanguage(selectedLang, updateContent);
            localStorage.setItem('language', selectedLang);
            syncCheckboxes(selectedLang);
        });
    });

    function setLanguageFromLocalStorage() {
        const savedLanguage = localStorage.getItem('language') || 'en';
        syncCheckboxes(savedLanguage);
        i18next.changeLanguage(savedLanguage, updateContent);
    }
});





