// Troubleshooting Component for Mitsubishi ASX 2011
// Handles diagnostic procedures and problem solving

import { commonProblems } from '../data/repairGuides.js';

export class TroubleshootingComponent {
    constructor() {
        this.container = null;
        this.currentCategory = null;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Troubleshooting container not found');
            return;
        }

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Category cards
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = card.onclick?.toString().match(/showTroubleshootingCategory\('([^']+)'\)/);
                if (category) {
                    this.showCategory(category[1]);
                }
            });
        });
    }

    render() {
        this.container.innerHTML = `
            <div class="troubleshooting-intro">
                <h3>Диагностика проблем</h3>
                <p>Выберите категорию проблемы для получения пошаговой инструкции по диагностике и решению.</p>
            </div>
        `;
    }

    showCategory(category) {
        const content = document.getElementById('troubleshooting-content');
        if (!content) return;

        this.currentCategory = category;
        
        if (category === 'smells') {
            this.renderSmellsGuide(content);
        } else if (category === 'noises') {
            this.renderNoisesGuide(content);
        } else {
            this.renderGeneralTroubleshooting(content, category);
        }
    }

    renderSmellsGuide(container) {
        const smells = commonProblems.smells;
        
        container.innerHTML = `
            <div class="troubleshooting-guide">
                <div class="guide-header">
                    <i class="${smells.icon}"></i>
                    <h3>${smells.title}</h3>
                </div>
                
                <div class="problems-list">
                    ${smells.problems.map(problem => this.renderProblem(problem)).join('')}
                </div>
            </div>
        `;
    }

    renderNoisesGuide(container) {
        const noises = commonProblems.noises;
        
        container.innerHTML = `
            <div class="troubleshooting-guide">
                <div class="guide-header">
                    <i class="${noises.icon}"></i>
                    <h3>${noises.title}</h3>
                </div>
                
                <div class="problems-list">
                    ${noises.problems.map(problem => this.renderProblem(problem)).join('')}
                </div>
            </div>
        `;
    }

    renderGeneralTroubleshooting(container, category) {
        const categoryData = this.getCategoryData(category);
        
        container.innerHTML = `
            <div class="troubleshooting-guide">
                <div class="guide-header">
                    <i class="${categoryData.icon}"></i>
                    <h3>${categoryData.title}</h3>
                </div>
                
                <div class="troubleshooting-steps">
                    ${categoryData.steps.map(step => this.renderStep(step)).join('')}
                </div>
            </div>
        `;
    }

    renderProblem(problem) {
        const urgencyClass = this.getUrgencyClass(problem.urgency);
        
        return `
            <div class="problem-item">
                <div class="problem-header">
                    <h4>${problem.problem}</h4>
                    <span class="urgency ${urgencyClass}">${problem.urgency}</span>
                </div>
                
                <div class="problem-content">
                    <p class="description">${problem.description}</p>
                    
                    <div class="causes">
                        <h5><i class="fas fa-search"></i> Возможные причины:</h5>
                        <ul>
                            ${problem.causes.map(cause => `<li>${cause}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="solutions">
                        <h5><i class="fas fa-tools"></i> Решения:</h5>
                        <ul>
                            ${problem.solutions.map(solution => `<li>${solution}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="safety-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Безопасность:</strong> ${problem.safety}
                    </div>
                </div>
            </div>
        `;
    }

    renderStep(step) {
        return `
            <div class="step-item">
                <div class="step-header">
                    <span class="step-number">${step.step}</span>
                    <h4>${step.title}</h4>
                </div>
                <div class="step-content">
                    <p>${step.description}</p>
                    ${step.tools ? `
                        <div class="step-tools">
                            <strong>Инструменты:</strong> ${step.tools.join(', ')}
                        </div>
                    ` : ''}
                    ${step.time ? `
                        <div class="step-time">
                            <strong>Время:</strong> ${step.time}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    getUrgencyClass(urgency) {
        const urgencyMap = {
            'Низкая': 'low',
            'Средняя': 'medium',
            'Высокая': 'high',
            'Критическая': 'critical'
        };
        return urgencyMap[urgency] || 'medium';
    }

    getCategoryData(category) {
        const categories = {
            engine: {
                title: "Диагностика двигателя",
                icon: "fas fa-cog",
                steps: [
                    {
                        step: 1,
                        title: "Проверка уровня масла",
                        description: "Проверьте уровень моторного масла щупом. Масло должно быть между метками min и max.",
                        tools: ["Тряпка", "Фонарик"],
                        time: "5 минут"
                    },
                    {
                        step: 2,
                        title: "Проверка охлаждающей жидкости",
                        description: "Проверьте уровень антифриза в расширительном бачке.",
                        tools: ["Фонарик"],
                        time: "3 минуты"
                    },
                    {
                        step: 3,
                        title: "Проверка свечей зажигания",
                        description: "Снимите свечи зажигания и проверьте их состояние.",
                        tools: ["Свечной ключ", "Фонарик"],
                        time: "30 минут"
                    }
                ]
            },
            transmission: {
                title: "Диагностика трансмиссии",
                icon: "fas fa-cogs",
                steps: [
                    {
                        step: 1,
                        title: "Проверка уровня масла АКПП",
                        description: "Проверьте уровень масла в коробке передач.",
                        tools: ["Щуп", "Фонарик"],
                        time: "10 минут"
                    },
                    {
                        step: 2,
                        title: "Проверка работы переключения",
                        description: "Протестируйте переключение передач на разных режимах.",
                        tools: [],
                        time: "15 минут"
                    }
                ]
            }
        };
        
        return categories[category] || {
            title: "Диагностика",
            icon: "fas fa-tools",
            steps: []
        };
    }
}