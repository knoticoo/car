// Mitsubishi ASX 2011 Helper Application
// Comprehensive error codes, troubleshooting, and maintenance data

// Error Codes Database
const errorCodes = {
    engine: [
        {
            code: "P0100",
            title: "Неисправность датчика массового расхода воздуха",
            description: "Датчик массового расхода воздуха (MAF) работает неправильно или неисправен",
            symptoms: [
                "Двигатель глохнет на холостом ходу",
                "Плохая работа двигателя при разгоне",
                "Увеличенный расход топлива",
                "Нестабильные обороты"
            ],
            solutions: [
                "Проверить подключение датчика MAF",
                "Очистить датчик специальным очистителем",
                "Проверить целостность проводки",
                "Заменить датчик при необходимости"
            ],
            difficulty: "Средне",
            time: "30-60 минут",
            cost: "5000-15000 руб"
        },
        {
            code: "P0301",
            title: "Пропуски зажигания в цилиндре 1",
            description: "Обнаружены пропуски зажигания в первом цилиндре",
            symptoms: [
                "Двигатель трясется на холостом ходу",
                "Потеря мощности",
                "Неравномерная работа двигателя",
                "Повышенный расход топлива"
            ],
            solutions: [
                "Проверить свечи зажигания",
                "Проверить катушки зажигания",
                "Проверить форсунки",
                "Проверить компрессию в цилиндре"
            ],
            difficulty: "Легко",
            time: "1-2 часа",
            cost: "2000-8000 руб"
        },
        {
            code: "P0420",
            title: "Низкая эффективность каталитического нейтрализатора",
            description: "Каталитический нейтрализатор работает неэффективно",
            symptoms: [
                "Повышенный расход топлива",
                "Снижение мощности",
                "Неприятный запах выхлопа",
                "Повышенная температура под капотом"
            ],
            solutions: [
                "Проверить состояние катализатора",
                "Проверить датчики кислорода",
                "Проверить герметичность выхлопной системы",
                "Заменить катализатор при необходимости"
            ],
            difficulty: "Сложно",
            time: "2-4 часа",
            cost: "15000-50000 руб"
        }
    ],
    transmission: [
        {
            code: "P0700",
            title: "Неисправность системы управления трансмиссией",
            description: "Обнаружена неисправность в системе управления автоматической коробкой передач",
            symptoms: [
                "Коробка передач не переключается",
                "Рывки при переключении",
                "Перегрев трансмиссии",
                "Индикатор неисправности на панели"
            ],
            solutions: [
                "Проверить уровень масла в коробке",
                "Проверить датчики скорости",
                "Проверить электропроводку",
                "Диагностика в сервисе"
            ],
            difficulty: "Сложно",
            time: "1-3 часа",
            cost: "5000-25000 руб"
        }
    ],
    electrical: [
        {
            code: "P0560",
            title: "Неисправность системы напряжения",
            description: "Обнаружены проблемы с системой электропитания",
            symptoms: [
                "Проблемы с запуском двигателя",
                "Нестабильная работа электроники",
                "Тусклый свет фар",
                "Разряженный аккумулятор"
            ],
            solutions: [
                "Проверить зарядку аккумулятора",
                "Проверить генератор",
                "Проверить клеммы аккумулятора",
                "Проверить реле и предохранители"
            ],
            difficulty: "Легко",
            time: "30-60 минут",
            cost: "1000-10000 руб"
        }
    ],
    brakes: [
        {
            code: "C1201",
            title: "Неисправность системы ABS",
            description: "Обнаружена неисправность в системе антиблокировочных тормозов",
            symptoms: [
                "Индикатор ABS горит постоянно",
                "Блокировка колес при торможении",
                "Вибрация педали тормоза",
                "Снижение эффективности торможения"
            ],
            solutions: [
                "Проверить датчики ABS",
                "Проверить проводку к датчикам",
                "Проверить блок управления ABS",
                "Проверить тормозную жидкость"
            ],
            difficulty: "Средне",
            time: "1-2 часа",
            cost: "3000-15000 руб"
        }
    ]
};

// Troubleshooting Data
const troubleshootingData = {
    engine: {
        title: "Диагностика проблем двигателя",
        problems: [
            {
                problem: "Двигатель не запускается",
                steps: [
                    {
                        step: 1,
                        title: "Проверка аккумулятора",
                        description: "Убедитесь, что аккумулятор заряжен и клеммы чистые",
                        tools: ["Мультиметр", "Наждачная бумага"],
                        time: "10 минут"
                    },
                    {
                        step: 2,
                        title: "Проверка топлива",
                        description: "Проверьте уровень топлива и работу топливного насоса",
                        tools: ["Ключ для снятия топливного фильтра"],
                        time: "15 минут"
                    },
                    {
                        step: 3,
                        title: "Проверка свечей зажигания",
                        description: "Снимите свечи и проверьте их состояние",
                        tools: ["Свечной ключ", "Компрессометр"],
                        time: "30 минут"
                    }
                ]
            },
            {
                problem: "Двигатель трясется на холостом ходу",
                steps: [
                    {
                        step: 1,
                        title: "Проверка опор двигателя",
                        description: "Осмотрите опоры двигателя на предмет износа",
                        tools: ["Домкрат", "Подставки"],
                        time: "20 минут"
                    },
                    {
                        step: 2,
                        title: "Проверка системы зажигания",
                        description: "Проверьте катушки зажигания и провода",
                        tools: ["Мультиметр", "Тестер искры"],
                        time: "30 минут"
                    }
                ]
            }
        ]
    },
    transmission: {
        title: "Диагностика трансмиссии",
        problems: [
            {
                problem: "Коробка передач не переключается",
                steps: [
                    {
                        step: 1,
                        title: "Проверка уровня масла",
                        description: "Проверьте уровень и состояние масла в коробке",
                        tools: ["Щуп", "Перчатки"],
                        time: "15 минут"
                    },
                    {
                        step: 2,
                        title: "Проверка датчиков",
                        description: "Проверьте датчики скорости и положения селектора",
                        tools: ["Мультиметр", "Сканер"],
                        time: "45 минут"
                    }
                ]
            }
        ]
    }
};

// Parts Catalog
const partsCatalog = {
    engine: [
        {
            name: "Масляный фильтр двигателя",
            partNumber: "MD360785",
            price: 1200,
            description: "Оригинальный масляный фильтр для двигателя 4B11",
            category: "engine",
            difficulty: "Легко",
            time: "15 минут"
        },
        {
            name: "Воздушный фильтр",
            partNumber: "MD360786",
            price: 800,
            description: "Воздушный фильтр салона Mitsubishi ASX",
            category: "engine",
            difficulty: "Легко",
            time: "10 минут"
        },
        {
            name: "Свечи зажигания NGK",
            partNumber: "NGK-ILZKR7B-11",
            price: 2500,
            description: "Комплект свечей зажигания (4 шт.)",
            category: "engine",
            difficulty: "Легко",
            time: "30 минут"
        }
    ],
    brakes: [
        {
            name: "Тормозные колодки передние",
            partNumber: "MB123456",
            price: 3500,
            description: "Комплект тормозных колодок передних колес",
            category: "brakes",
            difficulty: "Средне",
            time: "1 час"
        },
        {
            name: "Тормозные диски передние",
            partNumber: "MB123457",
            price: 4500,
            description: "Тормозные диски передних колес (2 шт.)",
            category: "brakes",
            difficulty: "Средне",
            time: "1.5 часа"
        }
    ]
};

// Application State
let currentSection = 'home';
let currentUser = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadErrorCodes();
    loadParts();
});

function initializeApp() {
    // Set up navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('href').substring(1);
            showSection(targetSection);
        });
    });

    // Set up search functionality
    const globalSearch = document.getElementById('global-search');
    if (globalSearch) {
        globalSearch.addEventListener('input', handleGlobalSearch);
    }

    const errorSearch = document.getElementById('error-search');
    if (errorSearch) {
        errorSearch.addEventListener('input', filterErrorCodes);
    }

    const errorCategory = document.getElementById('error-category');
    if (errorCategory) {
        errorCategory.addEventListener('change', filterErrorCodes);
    }
}

function setupEventListeners() {
    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const section = this.onclick.toString().match(/showSection\('([^']+)'\)/);
            if (section) {
                showSection(section[1]);
            }
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Load section-specific content
    switch(sectionId) {
        case 'error-codes':
            loadErrorCodes();
            break;
        case 'troubleshooting':
            loadTroubleshooting();
            break;
        case 'parts':
            loadParts();
            break;
    }
}

function loadErrorCodes() {
    const container = document.getElementById('error-codes-list');
    if (!container) return;

    let allCodes = [];
    Object.keys(errorCodes).forEach(category => {
        errorCodes[category].forEach(code => {
            allCodes.push({...code, category});
        });
    });

    container.innerHTML = allCodes.map(code => `
        <div class="error-code-item">
            <h3>${code.code} - ${code.title}</h3>
            <p class="description">${code.description}</p>
            <div class="symptoms">
                <h4>Симптомы:</h4>
                <ul>
                    ${code.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                </ul>
            </div>
            <div class="solutions">
                <h4>Решения:</h4>
                <ul>
                    ${code.solutions.map(solution => `<li>${solution}</li>`).join('')}
                </ul>
            </div>
            <div class="code-info">
                <span class="difficulty">Сложность: ${code.difficulty}</span>
                <span class="time">Время: ${code.time}</span>
                <span class="cost">Стоимость: ${code.cost}</span>
            </div>
        </div>
    `).join('');
}

function filterErrorCodes() {
    const searchTerm = document.getElementById('error-search').value.toLowerCase();
    const category = document.getElementById('error-category').value;
    
    let filteredCodes = [];
    Object.keys(errorCodes).forEach(cat => {
        if (!category || cat === category) {
            errorCodes[cat].forEach(code => {
                if (!searchTerm || 
                    code.code.toLowerCase().includes(searchTerm) ||
                    code.title.toLowerCase().includes(searchTerm) ||
                    code.description.toLowerCase().includes(searchTerm)) {
                    filteredCodes.push({...code, category: cat});
                }
            });
        }
    });

    const container = document.getElementById('error-codes-list');
    if (container) {
        container.innerHTML = filteredCodes.map(code => `
            <div class="error-code-item">
                <h3>${code.code} - ${code.title}</h3>
                <p class="description">${code.description}</p>
                <div class="symptoms">
                    <h4>Симптомы:</h4>
                    <ul>
                        ${code.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                    </ul>
                </div>
                <div class="solutions">
                    <h4>Решения:</h4>
                    <ul>
                        ${code.solutions.map(solution => `<li>${solution}</li>`).join('')}
                    </ul>
                </div>
                <div class="code-info">
                    <span class="difficulty">Сложность: ${code.difficulty}</span>
                    <span class="time">Время: ${code.time}</span>
                    <span class="cost">Стоимость: ${code.cost}</span>
                </div>
            </div>
        `).join('');
    }
}

function showTroubleshootingCategory(category) {
    const content = document.getElementById('troubleshooting-content');
    if (!content) return;

    const data = troubleshootingData[category];
    if (!data) return;

    content.innerHTML = `
        <div class="troubleshooting-steps">
            <h3>${data.title}</h3>
            ${data.problems.map(problem => `
                <div class="problem-section">
                    <h4>${problem.problem}</h4>
                    ${problem.steps.map(step => `
                        <div class="step">
                            <h4>Шаг ${step.step}: ${step.title}</h4>
                            <p>${step.description}</p>
                            <div class="step-info">
                                <span class="tools">Инструменты: ${step.tools.join(', ')}</span>
                                <span class="time">Время: ${step.time}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;
}

function loadTroubleshooting() {
    // This will be called when troubleshooting section is shown
    // The content will be loaded when a category is selected
}

function loadParts() {
    const container = document.getElementById('parts-grid');
    if (!container) return;

    let allParts = [];
    Object.keys(partsCatalog).forEach(category => {
        partsCatalog[category].forEach(part => {
            allParts.push({...part, category});
        });
    });

    container.innerHTML = allParts.map(part => `
        <div class="part-card">
            <h4>${part.name}</h4>
            <p class="part-number">Артикул: ${part.partNumber}</p>
            <p class="price">${part.price.toLocaleString()} руб.</p>
            <p class="description">${part.description}</p>
            <div class="part-info">
                <span class="difficulty">Сложность: ${part.difficulty}</span>
                <span class="time">Время: ${part.time}</span>
            </div>
            <button onclick="addToCart('${part.partNumber}')">Добавить в корзину</button>
        </div>
    `).join('');
}

function addToCart(partNumber) {
    // Simple cart functionality
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.includes(partNumber)) {
        cart.push(partNumber);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Запчасть добавлена в корзину!');
    } else {
        alert('Запчасть уже в корзине!');
    }
}

function handleGlobalSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm.length < 2) return;

    // Search across all sections
    const results = [];
    
    // Search error codes
    Object.keys(errorCodes).forEach(category => {
        errorCodes[category].forEach(code => {
            if (code.code.toLowerCase().includes(searchTerm) ||
                code.title.toLowerCase().includes(searchTerm) ||
                code.description.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'error-code',
                    title: `${code.code} - ${code.title}`,
                    description: code.description,
                    section: 'error-codes'
                });
            }
        });
    });

    // Search parts
    Object.keys(partsCatalog).forEach(category => {
        partsCatalog[category].forEach(part => {
            if (part.name.toLowerCase().includes(searchTerm) ||
                part.description.toLowerCase().includes(searchTerm)) {
                results.push({
                    type: 'part',
                    title: part.name,
                    description: part.description,
                    section: 'parts'
                });
            }
        });
    });

    // Display search results (simplified for now)
    if (results.length > 0) {
        console.log('Search results:', results);
        // In a real app, you'd show these in a dropdown or results page
    }
}

// Repair Instructions Data
const repairInstructions = {
    engine: [
        {
            title: "Замена масла двигателя",
            difficulty: "Легко",
            time: "30 минут",
            tools: ["Ключ для масляного фильтра", "Воронка", "Перчатки", "Тряпки"],
            steps: [
                "Прогрейте двигатель до рабочей температуры",
                "Заглушите двигатель и дайте остыть 5 минут",
                "Снимите пробку сливного отверстия",
                "Слейте старое масло в поддон",
                "Замените масляный фильтр",
                "Залейте новое масло (4.2 литра 5W-30)",
                "Проверьте уровень масла щупом"
            ],
            cost: "2000-3000 руб"
        },
        {
            title: "Замена свечей зажигания",
            difficulty: "Легко",
            time: "45 минут",
            tools: ["Свечной ключ 16мм", "Диэлектрическая смазка", "Торцевой ключ"],
            steps: [
                "Отсоедините минусовую клемму аккумулятора",
                "Снимите пластиковую крышку двигателя",
                "Отсоедините провода от катушек зажигания",
                "Выкрутите свечи свечным ключом",
                "Установите новые свечи с моментом 25 Нм",
                "Подключите провода к катушкам",
                "Установите крышку двигателя"
            ],
            cost: "1500-2500 руб"
        }
    ],
    brakes: [
        {
            title: "Замена тормозных колодок",
            difficulty: "Средне",
            time: "2 часа",
            tools: ["Домкрат", "Подставки", "Ключи 14мм и 17мм", "Скоба для вдавливания поршня"],
            steps: [
                "Поднимите автомобиль и снимите колесо",
                "Открутите болты крепления суппорта",
                "Снимите суппорт и старые колодки",
                "Вдавите поршень тормозного цилиндра",
                "Установите новые колодки",
                "Соберите суппорт в обратном порядке",
                "Прокачайте тормозную систему"
            ],
            cost: "3000-5000 руб"
        }
    ]
};

// Maintenance Schedule Data
const maintenanceSchedule = {
    "10000": {
        mileage: "10,000 км",
        items: [
            "Замена масла двигателя",
            "Замена масляного фильтра",
            "Проверка уровня всех жидкостей",
            "Проверка тормозных колодок",
            "Проверка давления в шинах"
        ]
    },
    "20000": {
        mileage: "20,000 км",
        items: [
            "Замена воздушного фильтра",
            "Замена салонного фильтра",
            "Проверка тормозных дисков",
            "Диагностика подвески",
            "Проверка ремней и шлангов"
        ]
    },
    "40000": {
        mileage: "40,000 км",
        items: [
            "Замена свечей зажигания",
            "Замена топливного фильтра",
            "Проверка ремня ГРМ",
            "Замена антифриза",
            "Диагностика системы зажигания"
        ]
    },
    "60000": {
        mileage: "60,000 км",
        items: [
            "Замена ремня ГРМ",
            "Замена роликов и натяжителя",
            "Замена помпы",
            "Замена тормозной жидкости",
            "Диагностика трансмиссии"
        ]
    }
};

// OBD-II Integration
class OBD2Reader {
    constructor() {
        this.isConnected = false;
    }

    async connect() {
        try {
            // Simulate OBD-II connection
            this.isConnected = true;
            return true;
        } catch (error) {
            console.error('Ошибка подключения к OBD-II:', error);
            return false;
        }
    }

    async readCodes() {
        if (!this.isConnected) {
            throw new Error('OBD-II не подключен');
        }
        
        // Simulate reading error codes
        return [
            { code: 'P0100', description: 'Неисправность датчика MAF' },
            { code: 'P0301', description: 'Пропуски зажигания в цилиндре 1' }
        ];
    }

    async clearCodes() {
        if (!this.isConnected) {
            throw new Error('OBD-II не подключен');
        }
        
        // Simulate clearing codes
        return true;
    }
}

// User Account Management
class UserAccount {
    constructor() {
        this.carInfo = {
            year: 2011,
            mileage: 0,
            lastService: null,
            vin: null
        };
        this.maintenanceHistory = [];
        this.favoriteParts = [];
    }

    saveCarInfo(info) {
        this.carInfo = { ...this.carInfo, ...info };
        localStorage.setItem('asx_car_info', JSON.stringify(this.carInfo));
    }

    loadCarInfo() {
        const saved = localStorage.getItem('asx_car_info');
        if (saved) {
            this.carInfo = { ...this.carInfo, ...JSON.parse(saved) };
        }
    }

    addMaintenanceRecord(record) {
        this.maintenanceHistory.push({
            ...record,
            date: new Date().toISOString(),
            mileage: this.carInfo.mileage
        });
        localStorage.setItem('asx_maintenance_history', JSON.stringify(this.maintenanceHistory));
    }

    getMaintenanceHistory() {
        const saved = localStorage.getItem('asx_maintenance_history');
        return saved ? JSON.parse(saved) : [];
    }
}

// Forum System
class ForumSystem {
    constructor() {
        this.topics = [
            {
                id: 1,
                title: "Проблема с запуском двигателя",
                author: "Иван Петров",
                date: "2 дня назад",
                replies: 15,
                category: "Общие вопросы",
                content: "Доброе утро! У меня ASX 2011 года, не заводится с утра. Аккумулятор новый, стартер крутит, но двигатель не схватывает. Что может быть?"
            },
            {
                id: 2,
                title: "Замена масла - какой лучше?",
                author: "Мария Сидорова",
                date: "1 неделя назад",
                replies: 8,
                category: "Общие вопросы",
                content: "Подскажите, какое масло лучше заливать в ASX 2011? Сейчас использую 5W-30, но хочется узнать мнение других владельцев."
            },
            {
                id: 3,
                title: "Код ошибки P0301 - пропуски зажигания",
                author: "Алексей Козлов",
                date: "3 дня назад",
                replies: 12,
                category: "Технические вопросы",
                content: "Появился код P0301, двигатель трясется на холостом ходу. Заменил свечи, не помогло. Что еще проверить?"
            }
        ];
    }

    getTopics(category = null) {
        if (category) {
            return this.topics.filter(topic => topic.category === category);
        }
        return this.topics;
    }

    createTopic(topic) {
        const newTopic = {
            ...topic,
            id: this.topics.length + 1,
            date: "только что",
            replies: 0
        };
        this.topics.unshift(newTopic);
        return newTopic;
    }
}

// Initialize global objects
const obd2Reader = new OBD2Reader();
const userAccount = new UserAccount();
const forumSystem = new ForumSystem();

// Additional utility functions
function showRepairCategory(category) {
    const content = document.getElementById('repair-content');
    if (!content) return;

    const repairs = repairInstructions[category];
    if (!repairs) return;

    content.innerHTML = `
        <div class="repair-instructions">
            <h3>Инструкции по ремонту - ${category}</h3>
            ${repairs.map(repair => `
                <div class="repair-instruction">
                    <h4>${repair.title}</h4>
                    <div class="repair-meta">
                        <span class="difficulty ${repair.difficulty.toLowerCase()}">${repair.difficulty}</span>
                        <span class="time">Время: ${repair.time}</span>
                        <span class="cost">Стоимость: ${repair.cost}</span>
                    </div>
                    <div class="tools-list">
                        <h5>Необходимые инструменты:</h5>
                        <ul>
                            ${repair.tools.map(tool => `<li>${tool}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="repair-steps">
                        <h5>Пошаговая инструкция:</h5>
                        <ol>
                            ${repair.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// OBD-II Integration Functions
async function connectOBD2() {
    const connected = await obd2Reader.connect();
    if (connected) {
        alert('OBD-II сканер подключен успешно!');
        document.getElementById('obd-status').textContent = 'Подключен';
        document.getElementById('obd-status').className = 'status connected';
    } else {
        alert('Ошибка подключения к OBD-II сканеру');
    }
}

async function readErrorCodes() {
    try {
        const codes = await obd2Reader.readCodes();
        displayOBD2Codes(codes);
    } catch (error) {
        alert('Ошибка чтения кодов: ' + error.message);
    }
}

function displayOBD2Codes(codes) {
    const container = document.getElementById('obd-codes-display');
    if (!container) return;

    container.innerHTML = codes.map(code => `
        <div class="obd-code-item">
            <span class="code">${code.code}</span>
            <span class="description">${code.description}</span>
            <button onclick="lookupCode('${code.code}')">Подробнее</button>
        </div>
    `).join('');
}

function lookupCode(code) {
    // Find code in our database and show details
    let found = false;
    Object.keys(errorCodes).forEach(category => {
        errorCodes[category].forEach(errorCode => {
            if (errorCode.code === code) {
                showSection('error-codes');
                // Scroll to the specific code
                setTimeout(() => {
                    const element = document.querySelector(`[data-code="${code}"]`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        element.style.backgroundColor = '#fff3cd';
                    }
                }, 100);
                found = true;
            }
        });
    });
    
    if (!found) {
        alert('Код ' + code + ' не найден в базе данных');
    }
}

// Cost Calculator
function calculateRepairCost(parts, labor) {
    const partsCost = parts.reduce((total, part) => total + part.price, 0);
    const laborCost = labor * 2000; // 2000 руб/час
    const total = partsCost + laborCost;
    
    return {
        parts: partsCost,
        labor: laborCost,
        total: total,
        savings: total * 0.3 // 30% savings if DIY
    };
}

// Mobile Detection and Responsive Features
function isMobile() {
    return window.innerWidth <= 768;
}

function setupMobileFeatures() {
    if (isMobile()) {
        // Add mobile-specific features
        document.body.classList.add('mobile');
        
        // Add swipe gestures for navigation
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next section
                    navigateToNextSection();
                } else {
                    // Swipe right - previous section
                    navigateToPreviousSection();
                }
            }
        });
    }
}

function navigateToNextSection() {
    const sections = ['home', 'error-codes', 'troubleshooting', 'maintenance', 'repairs', 'parts', 'forum', 'account'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    showSection(sections[nextIndex]);
}

function navigateToPreviousSection() {
    const sections = ['home', 'error-codes', 'troubleshooting', 'maintenance', 'repairs', 'parts', 'forum', 'account'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    showSection(sections[prevIndex]);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadErrorCodes();
    loadParts();
    setupMobileFeatures();
    userAccount.loadCarInfo();
    
    // Load maintenance history
    const history = userAccount.getMaintenanceHistory();
    if (history.length > 0) {
        updateMaintenanceHistory(history);
    }
});

function updateMaintenanceHistory(history) {
    const container = document.querySelector('.history-timeline');
    if (!container) return;
    
    container.innerHTML = history.map(record => `
        <div class="history-item">
            <div class="history-date">${new Date(record.date).toLocaleDateString('ru-RU')}</div>
            <div class="history-content">
                <h4>${record.service}</h4>
                <p>Пробег: ${record.mileage.toLocaleString()} км</p>
                <p>Стоимость: ${record.cost || 'Не указана'}</p>
            </div>
        </div>
    `).join('');
}

console.log('Mitsubishi ASX 2011 Helper Application loaded successfully!');