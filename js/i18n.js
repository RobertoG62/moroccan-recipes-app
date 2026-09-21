const i18n = (() => {
    let currentLang = 'he';

    const translations = {
        he: {
            meta: {
                title: 'המטבח המרוקאי — מתכונים כשרים',
                description: 'המטבח המרוקאי — 50 מתכונים מרוקאיים אותנטיים, כולם כשרים, בעברית.'
            },
            header: {
                logo: 'המטבח המרוקאי',
                backToRecipes: 'חזרה למתכונים'
            },
            hero: {
                title: 'המטבח המרוקאי',
                subtitle: 'מתכונים כשרים אותנטיים מהלב של מרקש',
                searchPlaceholder: 'חיפוש מתכון...'
            },
            categories: {
                all: 'הכל',
                'סלטים וממרחים': 'סלטים וממרחים',
                'מרקים וחרירה': 'מרקים וחרירה',
                'טאג׳ין ובשרים': 'טאג׳ין ובשרים',
                'קוסקוס ומאפים': 'קוסקוס ומאפים',
                'קינוחים ומתוקים': 'קינוחים ומתוקים'
            },
            difficulty: {
                'קל': 'קל',
                'בינוני': 'בינוני',
                'מאתגר': 'מאתגר'
            },
            kosher: {
                'בשרי': 'בשרי',
                'חלבי': 'חלבי',
                'פרווה': 'פרווה'
            },
            detail: {
                prepTime: 'זמן הכנה',
                cookTime: 'זמן בישול',
                servings: 'מנות',
                difficulty: 'רמת קושי',
                kosher: 'כשרות',
                ingredients: 'מצרכים',
                instructions: 'הוראות הכנה',
                categories: 'קטגוריות',
                whatsappShare: 'שלח רשימת קניות ב-WhatsApp',
                minutes: 'דקות'
            },
            search: {
                noResults: 'לא נמצאו מתכונים',
                tryAgain: 'נסו לשנות את מילות החיפוש או לבחור קטגוריה אחרת',
                clearFilters: 'נקה חיפוש',
                resultsCount: 'נמצאו {count} מתכונים'
            },
            loading: 'טוען מתכונים...',
            footer: {
                tagline: 'המטבח המרוקאי — מתכונים מרוקאיים כשרים, בעברית',
                backToHub: 'לעוד מתכוני עולם — חזרה לרכזת המתכונים'
            }
        },
        en: {
            meta: {
                title: 'Moroccan Kitchen — Kosher Recipes',
                description: 'Moroccan Kitchen — 50 authentic Moroccan recipes, all kosher, in English.'
            },
            header: {
                logo: 'Moroccan Kitchen',
                backToRecipes: 'Back to Recipes'
            },
            hero: {
                title: 'Moroccan Kitchen',
                subtitle: 'Authentic kosher recipes from the heart of Marrakesh',
                searchPlaceholder: 'Search recipe...'
            },
            categories: {
                all: 'All',
                'סלטים וממרחים': 'Salads & Dips',
                'מרקים וחרירה': 'Soups & Harira',
                'טאג׳ין ובשרים': 'Tagines & Meats',
                'קוסקוס ומאפים': 'Couscous & Pastries',
                'קינוחים ומתוקים': 'Desserts & Sweets',
                'Salads & Dips': 'Salads & Dips',
                'Soups & Harira': 'Soups & Harira',
                'Tagines & Meats': 'Tagines & Meats',
                'Couscous & Pastries': 'Couscous & Pastries',
                'Desserts & Sweets': 'Desserts & Sweets'
            },
            difficulty: {
                'קל': 'Easy',
                'בינוני': 'Medium',
                'מאתגר': 'Hard',
                'Easy': 'Easy',
                'Medium': 'Medium',
                'Hard': 'Hard'
            },
            kosher: {
                'בשרי': 'Meat',
                'חלבי': 'Dairy',
                'פרווה': 'Parve',
                'Meat': 'Meat',
                'Dairy': 'Dairy',
                'Parve': 'Parve'
            },
            detail: {
                prepTime: 'Prep Time',
                cookTime: 'Cook Time',
                servings: 'Servings',
                difficulty: 'Difficulty',
                kosher: 'Kosher',
                ingredients: 'Ingredients',
                instructions: 'Instructions',
                categories: 'Categories',
                whatsappShare: 'Share shopping list on WhatsApp',
                minutes: 'minutes'
            },
            search: {
                noResults: 'No recipes found',
                tryAgain: 'Try different search terms or select another category',
                clearFilters: 'Clear search',
                resultsCount: 'Found {count} recipes'
            },
            loading: 'Loading recipes...',
            footer: {
                tagline: 'Moroccan Kitchen — Authentic kosher Moroccan recipes',
                backToHub: 'More world recipes — Back to Recipe Hub'
            }
        }
    };

    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLang];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        return value || key;
    }

    function setLanguage(lang) {
        if (!translations[lang]) {
            console.error(`Language not supported: ${lang}`);
            return;
        }
        currentLang = lang;
    }

    function getLanguage() {
        return currentLang;
    }

    function detectLanguage() {
        const saved = localStorage.getItem('lang');
        if (saved && translations[saved]) {
            return saved;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('he')) return 'he';
        return 'en';
    }

    function init() {
        const detectedLang = detectLanguage();
        setLanguage(detectedLang);
        return detectedLang;
    }

    return {
        t,
        setLanguage,
        getLanguage,
        detectLanguage,
        init
    };
})();
