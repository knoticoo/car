// Maintenance Component for Mitsubishi ASX 2011
// Handles maintenance schedules and procedures

import { maintenanceSchedule, maintenanceTips, fluidSpecifications, seasonalMaintenance } from '../data/maintenance.js';
import { formatTime } from '../utils/helpers.js';

export class MaintenanceComponent {
    constructor() {
        this.container = null;
        this.currentMileage = 0;
    }

    init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Maintenance container not found');
            return;
        }

        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Mileage input
        const mileageInput = document.getElementById('current-mileage');
        if (mileageInput) {
            mileageInput.addEventListener('input', (e) => {
                this.currentMileage = parseInt(e.target.value) || 0;
                this.updateMaintenanceSchedule();
            });
        }
    }

    render() {
        this.renderMaintenanceSchedule();
        this.renderMaintenanceTips();
        this.renderFluidSpecifications();
        this.renderSeasonalMaintenance();
    }

    renderMaintenanceSchedule() {
        const scheduleContainer = document.querySelector('.maintenance-schedule');
        if (!scheduleContainer) return;

        scheduleContainer.innerHTML = `
            <h3>График обслуживания</h3>
            <div class="mileage-input">
                <label for="current-mileage">Текущий пробег (км):</label>
                <input type="number" id="current-mileage" placeholder="Введите пробег" value="${this.currentMileage}">
            </div>
            <div class="schedule-timeline">
                ${Object.keys(maintenanceSchedule).map(mileage => this.renderMaintenanceItem(mileage, maintenanceSchedule[mileage])).join('')}
            </div>
        `;
    }

    renderMaintenanceItem(mileage, data) {
        const isOverdue = this.currentMileage > parseInt(mileage);
        const isDue = this.currentMileage >= parseInt(mileage) * 0.9;
        
        return `
            <div class="timeline-item ${isOverdue ? 'overdue' : ''} ${isDue ? 'due' : ''}">
                <div class="timeline-marker">${mileage}</div>
                <div class="timeline-content">
                    <h4>${data.mileage}</h4>
                    <p class="interval">Интервал: ${data.interval}</p>
                    <div class="maintenance-items">
                        ${data.items.map(item => this.renderMaintenanceTask(item)).join('')}
                    </div>
                    ${isOverdue ? '<div class="overdue-warning">⚠️ Просрочено!</div>' : ''}
                    ${isDue && !isOverdue ? '<div class="due-warning">⏰ Скоро потребуется</div>' : ''}
                </div>
            </div>
        `;
    }

    renderMaintenanceTask(task) {
        return `
            <div class="maintenance-task">
                <div class="task-header">
                    <i class="${task.icon}"></i>
                    <h5>${task.task}</h5>
                    <span class="difficulty ${task.difficulty.toLowerCase()}">${task.difficulty}</span>
                </div>
                <p class="task-description">${task.description}</p>
                <div class="task-details">
                    <span class="time"><i class="fas fa-clock"></i> ${task.time}</span>
                    <span class="cost"><i class="fas fa-euro-sign"></i> ${task.cost}</span>
                </div>
                ${task.tools.length > 0 ? `
                    <div class="task-tools">
                        <strong>Инструменты:</strong> ${task.tools.join(', ')}
                    </div>
                ` : ''}
                ${task.parts.length > 0 ? `
                    <div class="task-parts">
                        <strong>Запчасти:</strong> ${task.parts.join(', ')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderMaintenanceTips() {
        const tipsContainer = document.querySelector('.maintenance-tips');
        if (!tipsContainer) return;

        tipsContainer.innerHTML = `
            <h3>Советы по обслуживанию</h3>
            <div class="tips-container">
                ${Object.keys(maintenanceTips).map(frequency => this.renderTipsByFrequency(frequency, maintenanceTips[frequency])).join('')}
            </div>
        `;
    }

    renderTipsByFrequency(frequency, tips) {
        const frequencyNames = {
            daily: 'Ежедневно',
            weekly: 'Еженедельно',
            monthly: 'Ежемесячно'
        };

        return `
            <div class="tips-section">
                <h4>${frequencyNames[frequency]}</h4>
                <div class="tips-grid">
                    ${tips.map(tip => `
                        <div class="tip-card">
                            <i class="${tip.icon}"></i>
                            <h5>${tip.tip}</h5>
                            <p>${tip.description}</p>
                            <span class="tip-time">${tip.time}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderFluidSpecifications() {
        const specsContainer = document.querySelector('.fluid-specifications');
        if (!specsContainer) return;

        specsContainer.innerHTML = `
            <h3>Спецификации жидкостей</h3>
            <div class="fluids-grid">
                ${Object.keys(fluidSpecifications).map(fluid => this.renderFluidSpec(fluid, fluidSpecifications[fluid])).join('')}
            </div>
        `;
    }

    renderFluidSpec(fluid, spec) {
        const fluidNames = {
            engineOil: 'Моторное масло',
            coolant: 'Охлаждающая жидкость',
            brakeFluid: 'Тормозная жидкость',
            transmissionOil: 'Масло АКПП',
            powerSteeringFluid: 'Жидкость ГУР'
        };

        return `
            <div class="fluid-spec">
                <h4>${fluidNames[fluid]}</h4>
                <div class="spec-details">
                    <p><strong>Тип:</strong> ${spec.type}</p>
                    <p><strong>Объем:</strong> ${spec.capacity}</p>
                    <p><strong>Замена:</strong> ${spec.changeInterval}</p>
                    <p><strong>Описание:</strong> ${spec.description}</p>
                    <div class="brands">
                        <strong>Рекомендуемые марки:</strong>
                        <ul>
                            ${spec.brands.map(brand => `<li>${brand}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    renderSeasonalMaintenance() {
        const seasonalContainer = document.querySelector('.seasonal-maintenance');
        if (!seasonalContainer) return;

        seasonalContainer.innerHTML = `
            <h3>Сезонное обслуживание</h3>
            <div class="seasons-grid">
                ${Object.keys(seasonalMaintenance).map(season => this.renderSeasonalTasks(season, seasonalMaintenance[season])).join('')}
            </div>
        `;
    }

    renderSeasonalTasks(season, tasks) {
        const seasonNames = {
            spring: 'Весна',
            summer: 'Лето',
            autumn: 'Осень',
            winter: 'Зима'
        };

        return `
            <div class="season-tasks">
                <h4>${seasonNames[season]}</h4>
                <div class="seasonal-tasks-list">
                    ${tasks.map(task => `
                        <div class="seasonal-task">
                            <h5>${task.task}</h5>
                            <p>${task.description}</p>
                            <div class="task-meta">
                                <span class="time">${task.time}</span>
                                <span class="cost">${task.cost}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    updateMaintenanceSchedule() {
        this.renderMaintenanceSchedule();
    }

    // Method to get next maintenance due
    getNextMaintenance() {
        const mileages = Object.keys(maintenanceSchedule).map(Number).sort((a, b) => a - b);
        const nextMileage = mileages.find(mileage => mileage > this.currentMileage);
        
        if (nextMileage) {
            return {
                mileage: nextMileage,
                data: maintenanceSchedule[nextMileage.toString()],
                kmRemaining: nextMileage - this.currentMileage
            };
        }
        
        return null;
    }

    // Method to get overdue maintenance
    getOverdueMaintenance() {
        const mileages = Object.keys(maintenanceSchedule).map(Number).sort((a, b) => a - b);
        return mileages
            .filter(mileage => mileage < this.currentMileage)
            .map(mileage => ({
                mileage,
                data: maintenanceSchedule[mileage.toString()]
            }));
    }
}