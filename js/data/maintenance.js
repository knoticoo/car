// Maintenance Schedules and Procedures for Mitsubishi ASX 2011
// Comprehensive maintenance information in Russian

export const maintenanceSchedule = {
    "10000": {
        mileage: "10,000 км",
        interval: "6 месяцев",
        items: [
            {
                task: "Замена масла двигателя",
                description: "Замена моторного масла и масляного фильтра",
                difficulty: "Легко",
                time: "30 минут",
                cost: "20-30 EUR",
                tools: ["Ключ для масляного фильтра", "Воронка", "Поддон"],
                parts: ["Масло 5W-30 (4.2л)", "Масляный фильтр"],
                icon: "fas fa-oil-can"
            },
            {
                task: "Проверка уровня жидкостей",
                description: "Проверка уровня всех рабочих жидкостей",
                difficulty: "Легко",
                time: "15 минут",
                cost: "0 EUR",
                tools: ["Тряпка", "Фонарик"],
                parts: [],
                icon: "fas fa-tint"
            },
            {
                task: "Проверка давления в шинах",
                description: "Проверка и регулировка давления в шинах",
                difficulty: "Легко",
                time: "10 минут",
                cost: "0 EUR",
                tools: ["Манометр", "Компрессор"],
                parts: [],
                icon: "fas fa-circle"
            },
            {
                task: "Проверка тормозных колодок",
                description: "Визуальная проверка состояния тормозных колодок",
                difficulty: "Легко",
                time: "20 минут",
                cost: "0 EUR",
                tools: ["Фонарик", "Зеркало"],
                parts: [],
                icon: "fas fa-circle"
            }
        ]
    },
    "20000": {
        mileage: "20,000 км",
        interval: "12 месяцев",
        items: [
            {
                task: "Замена воздушного фильтра",
                description: "Замена воздушного фильтра двигателя",
                difficulty: "Легко",
                time: "10 минут",
                cost: "8-15 EUR",
                tools: ["Отвертка"],
                parts: ["Воздушный фильтр"],
                icon: "fas fa-wind"
            },
            {
                task: "Замена салонного фильтра",
                description: "Замена фильтра системы кондиционирования",
                difficulty: "Легко",
                time: "15 минут",
                cost: "12-20 EUR",
                tools: ["Отвертка"],
                parts: ["Салонный фильтр"],
                icon: "fas fa-snowflake"
            },
            {
                task: "Проверка тормозных дисков",
                description: "Проверка состояния тормозных дисков",
                difficulty: "Средне",
                time: "30 минут",
                cost: "0 EUR",
                tools: ["Домкрат", "Подставки"],
                parts: [],
                icon: "fas fa-circle"
            },
            {
                task: "Диагностика подвески",
                description: "Проверка состояния элементов подвески",
                difficulty: "Средне",
                time: "45 минут",
                cost: "0 EUR",
                tools: ["Домкрат", "Подставки", "Монтировка"],
                parts: [],
                icon: "fas fa-car"
            }
        ]
    },
    "40000": {
        mileage: "40,000 км",
        interval: "24 месяца",
        items: [
            {
                task: "Замена свечей зажигания",
                description: "Замена свечей зажигания",
                difficulty: "Легко",
                time: "45 минут",
                cost: "15-25 EUR",
                tools: ["Свечной ключ 16мм", "Динамометрический ключ"],
                parts: ["Свечи зажигания NGK (4 шт.)"],
                icon: "fas fa-bolt"
            },
            {
                task: "Замена топливного фильтра",
                description: "Замена топливного фильтра",
                difficulty: "Средне",
                time: "1 час",
                cost: "15-25 EUR",
                tools: ["Ключи", "Отвертки"],
                parts: ["Топливный фильтр"],
                icon: "fas fa-filter"
            },
            {
                task: "Проверка ремня ГРМ",
                description: "Проверка состояния ремня газораспределительного механизма",
                difficulty: "Средне",
                time: "30 минут",
                cost: "0 EUR",
                tools: ["Фонарик", "Зеркало"],
                parts: [],
                icon: "fas fa-cog"
            },
            {
                task: "Замена антифриза",
                description: "Замена охлаждающей жидкости",
                difficulty: "Средне",
                time: "1 час",
                cost: "20-30 EUR",
                tools: ["Ключи", "Воронка", "Поддон"],
                parts: ["Антифриз (6л)", "Дистиллированная вода"],
                icon: "fas fa-thermometer-half"
            }
        ]
    },
    "60000": {
        mileage: "60,000 км",
        interval: "36 месяцев",
        items: [
            {
                task: "Замена ремня ГРМ",
                description: "Замена ремня газораспределительного механизма",
                difficulty: "Сложно",
                time: "4 часа",
                cost: "80-150 EUR",
                tools: ["Набор ключей", "Специальные инструменты"],
                parts: ["Ремень ГРМ", "Ролики", "Натяжитель", "Помпа"],
                icon: "fas fa-cog"
            },
            {
                task: "Замена тормозной жидкости",
                description: "Замена тормозной жидкости",
                difficulty: "Средне",
                time: "1 час",
                cost: "15-25 EUR",
                tools: ["Ключи", "Шланг", "Емкость"],
                parts: ["Тормозная жидкость DOT4 (1л)"],
                icon: "fas fa-tint"
            },
            {
                task: "Диагностика трансмиссии",
                description: "Полная диагностика коробки передач",
                difficulty: "Сложно",
                time: "2 часа",
                cost: "50-100 EUR",
                tools: ["Сканер", "Специальные инструменты"],
                parts: [],
                icon: "fas fa-cogs"
            }
        ]
    }
};

export const maintenanceTips = {
    daily: [
        {
            tip: "Проверка внешнего вида",
            description: "Осмотрите автомобиль на предмет повреждений, утечек жидкостей",
            icon: "fas fa-eye",
            time: "2 минуты"
        },
        {
            tip: "Проверка освещения",
            description: "Убедитесь, что все фары, габариты и стоп-сигналы работают",
            icon: "fas fa-lightbulb",
            time: "1 минута"
        },
        {
            tip: "Проверка давления в шинах",
            description: "Визуально проверьте состояние шин",
            icon: "fas fa-circle",
            time: "1 минута"
        }
    ],
    weekly: [
        {
            tip: "Проверка уровня масла",
            description: "Проверьте уровень моторного масла щупом",
            icon: "fas fa-oil-can",
            time: "3 минуты"
        },
        {
            tip: "Проверка уровня охлаждающей жидкости",
            description: "Проверьте уровень антифриза в расширительном бачке",
            icon: "fas fa-thermometer-half",
            time: "2 минуты"
        },
        {
            tip: "Проверка уровня тормозной жидкости",
            description: "Проверьте уровень тормозной жидкости в бачке",
            icon: "fas fa-tint",
            time: "2 минуты"
        },
        {
            tip: "Проверка аккумулятора",
            description: "Проверьте клеммы аккумулятора на окисление",
            icon: "fas fa-battery-half",
            time: "3 минуты"
        }
    ],
    monthly: [
        {
            tip: "Проверка давления в шинах",
            description: "Измерьте давление в шинах манометром",
            icon: "fas fa-circle",
            time: "10 минут"
        },
        {
            tip: "Проверка состояния шин",
            description: "Осмотрите шины на предмет износа и повреждений",
            icon: "fas fa-circle",
            time: "5 минут"
        },
        {
            tip: "Проверка фар",
            description: "Проверьте работу всех фар и габаритов",
            icon: "fas fa-lightbulb",
            time: "5 минут"
        },
        {
            tip: "Проверка дворников",
            description: "Проверьте работу стеклоочистителей",
            icon: "fas fa-windshield-wiper",
            time: "3 минуты"
        }
    ]
};

export const fluidSpecifications = {
    engineOil: {
        type: "5W-30",
        capacity: "4.2 литра",
        changeInterval: "10,000 км или 6 месяцев",
        brands: ["Mitsubishi Genuine", "Castrol", "Mobil 1", "Shell Helix"],
        description: "Синтетическое моторное масло для бензиновых двигателей"
    },
    coolant: {
        type: "Антифриз G12+",
        capacity: "6 литров",
        changeInterval: "40,000 км или 24 месяца",
        brands: ["Mitsubishi Genuine", "G12+", "Prestone"],
        description: "Охлаждающая жидкость с антикоррозионными свойствами"
    },
    brakeFluid: {
        type: "DOT 4",
        capacity: "1 литр",
        changeInterval: "60,000 км или 36 месяцев",
        brands: ["Mitsubishi Genuine", "DOT 4", "Brembo"],
        description: "Тормозная жидкость с высокой температурой кипения"
    },
    transmissionOil: {
        type: "ATF SP-III",
        capacity: "3.5 литра",
        changeInterval: "40,000 км или 24 месяца",
        brands: ["Mitsubishi Genuine", "ATF SP-III"],
        description: "Масло для автоматической коробки передач"
    },
    powerSteeringFluid: {
        type: "PSF",
        capacity: "1 литр",
        changeInterval: "40,000 км или 24 месяца",
        brands: ["Mitsubishi Genuine", "PSF"],
        description: "Жидкость для гидроусилителя руля"
    }
};

export const seasonalMaintenance = {
    spring: [
        {
            task: "Замена зимних шин на летние",
            description: "Смена шин в зависимости от сезона",
            time: "1 час",
            cost: "20-40 EUR"
        },
        {
            task: "Проверка кондиционера",
            description: "Проверка и заправка системы кондиционирования",
            time: "30 минут",
            cost: "30-50 EUR"
        },
        {
            task: "Мойка и полировка кузова",
            description: "Удаление зимних загрязнений и защита лакокрасочного покрытия",
            time: "2 часа",
            cost: "50-100 EUR"
        }
    ],
    summer: [
        {
            task: "Проверка системы охлаждения",
            description: "Проверка радиатора, патрубков и уровня антифриза",
            time: "30 минут",
            cost: "0 EUR"
        },
        {
            task: "Проверка кондиционера",
            description: "Проверка работы системы кондиционирования",
            time: "15 минут",
            cost: "0 EUR"
        }
    ],
    autumn: [
        {
            task: "Замена летних шин на зимние",
            description: "Подготовка к зимнему сезону",
            time: "1 час",
            cost: "20-40 EUR"
        },
        {
            task: "Проверка аккумулятора",
            description: "Проверка заряда и состояния аккумулятора",
            time: "15 минут",
            cost: "0 EUR"
        },
        {
            task: "Проверка системы отопления",
            description: "Проверка работы печки и обогревателей",
            time: "15 минут",
            cost: "0 EUR"
        }
    ],
    winter: [
        {
            task: "Проверка зимних шин",
            description: "Проверка давления и состояния зимних шин",
            time: "10 минут",
            cost: "0 EUR"
        },
        {
            task: "Проверка системы отопления",
            description: "Проверка работы печки и обогревателей",
            time: "15 минут",
            cost: "0 EUR"
        },
        {
            task: "Подготовка к морозам",
            description: "Проверка антифриза и зимних жидкостей",
            time: "20 минут",
            cost: "0 EUR"
        }
    ]
};