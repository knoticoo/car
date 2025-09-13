// API Service for Mitsubishi ASX 2011 Application
// Provides unified interface for all car-related data and operations

import CarDatabase from '../data/database.js';
import PartsScraper from '../utils/scraper.js';

export class CarAPI {
    constructor() {
        this.database = CarDatabase;
        this.scraper = PartsScraper;
        this.initialized = false;
    }

    async initialize() {
        try {
            await this.database.initialize();
            this.initialized = true;
            console.log('Car API initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Car API:', error);
            throw error;
        }
    }

    // Error Codes API
    async getErrorCode(code) {
        if (!this.initialized) await this.initialize();
        return await this.database.getErrorCode(code);
    }

    async searchErrorCodes(query) {
        if (!this.initialized) await this.initialize();
        return await this.database.searchErrorCodes(query);
    }

    async getAllErrorCodes() {
        if (!this.initialized) await this.initialize();
        const errorCodes = await import('../data/errorCodes.js');
        return errorCodes.errorCodes;
    }

    async getErrorCodesByCategory(category) {
        if (!this.initialized) await this.initialize();
        const errorCodes = await import('../data/errorCodes.js');
        return errorCodes.errorCodes[category] || [];
    }

    // Parts API
    async getPart(partNumber) {
        if (!this.initialized) await this.initialize();
        return await this.database.getPart(partNumber);
    }

    async searchParts(query) {
        if (!this.initialized) await this.initialize();
        return await this.database.searchParts(query);
    }

    async getPartsByCategory(category) {
        if (!this.initialized) await this.initialize();
        return await this.database.getPartsByCategory(category);
    }

    async getAllParts() {
        if (!this.initialized) await this.initialize();
        const parts = await import('../data/partsCatalog.js');
        return parts.partsCatalog;
    }

    async searchPartOnline(partNumber) {
        if (!this.initialized) await this.initialize();
        return await this.scraper.searchMultipleSuppliers(partNumber);
    }

    async comparePrices(partNumber) {
        if (!this.initialized) await this.initialize();
        return await this.scraper.comparePrices(partNumber);
    }

    async getAvailabilityStatus(partNumber) {
        if (!this.initialized) await this.initialize();
        return await this.scraper.getAvailabilityStatus(partNumber);
    }

    // Suppliers API
    async getSupplier(name) {
        if (!this.initialized) await this.initialize();
        return await this.database.getSupplier(name);
    }

    async getAllSuppliers() {
        if (!this.initialized) await this.initialize();
        return await this.database.getAllSuppliers();
    }

    async searchSuppliers(query) {
        if (!this.initialized) await this.initialize();
        return await this.database.searchSuppliers(query);
    }

    // Maintenance API
    async getMaintenanceSchedule() {
        if (!this.initialized) await this.initialize();
        return await this.database.getMaintenanceSchedule();
    }

    async getMaintenanceHistory() {
        if (!this.initialized) await this.initialize();
        return await this.database.getMaintenanceHistory();
    }

    async addMaintenanceRecord(record) {
        if (!this.initialized) await this.initialize();
        return await this.database.addMaintenanceRecord(record);
    }

    async getMaintenanceStats() {
        if (!this.initialized) await this.initialize();
        return await this.database.getMaintenanceStats();
    }

    // Repair Guides API
    async getRepairGuide(title) {
        if (!this.initialized) await this.initialize();
        return await this.database.getRepairGuide(title);
    }

    async getAllRepairGuides() {
        if (!this.initialized) await this.initialize();
        return await this.database.getAllRepairGuides();
    }

    async getMaintenanceTips() {
        if (!this.initialized) await this.initialize();
        const guides = await import('../data/repairGuides.js');
        return guides.maintenanceTips;
    }

    async getEmergencyProcedures() {
        if (!this.initialized) await this.initialize();
        const guides = await import('../data/repairGuides.js');
        return guides.emergencyProcedures;
    }

    // Car Information API
    async getCarInfo() {
        if (!this.initialized) await this.initialize();
        return this.database.carInfo;
    }

    // Statistics API
    async getPartsStats() {
        if (!this.initialized) await this.initialize();
        return await this.database.getPartsStats();
    }

    async getMaintenanceStats() {
        if (!this.initialized) await this.initialize();
        return await this.database.getMaintenanceStats();
    }

    // Search API
    async searchAll(query) {
        if (!this.initialized) await this.initialize();
        return await this.database.searchAll(query);
    }

    // Data Management API
    async exportData() {
        if (!this.initialized) await this.initialize();
        return await this.database.exportData();
    }

    async importData(data) {
        if (!this.initialized) await this.initialize();
        return await this.database.importData(data);
    }

    // Utility Methods
    async getDashboardData() {
        if (!this.initialized) await this.initialize();
        
        const [carInfo, maintenanceStats, partsStats, recentMaintenance] = await Promise.all([
            this.getCarInfo(),
            this.getMaintenanceStats(),
            this.getPartsStats(),
            this.getMaintenanceHistory()
        ]);

        return {
            carInfo,
            maintenanceStats,
            partsStats,
            recentMaintenance: recentMaintenance.slice(-5), // Last 5 records
            lastUpdated: new Date().toISOString()
        };
    }

    async getQuickSearchResults(query) {
        if (!this.initialized) await this.initialize();
        
        const [errorCodes, parts, suppliers] = await Promise.all([
            this.searchErrorCodes(query),
            this.searchParts(query),
            this.searchSuppliers(query)
        ]);

        return {
            errorCodes: errorCodes.slice(0, 3), // Top 3 results
            parts: parts.slice(0, 5), // Top 5 results
            suppliers: suppliers.slice(0, 3), // Top 3 results
            totalResults: errorCodes.length + parts.length + suppliers.length
        };
    }

    async getPartDetails(partNumber) {
        if (!this.initialized) await this.initialize();
        
        const [localPart, onlineResults, priceComparison] = await Promise.all([
            this.getPart(partNumber),
            this.searchPartOnline(partNumber),
            this.comparePrices(partNumber)
        ]);

        return {
            local: localPart,
            online: onlineResults,
            comparison: priceComparison,
            lastUpdated: new Date().toISOString()
        };
    }

    async getErrorCodeDetails(code) {
        if (!this.initialized) await this.initialize();
        
        const errorCode = await this.getErrorCode(code);
        if (!errorCode) {
            return null;
        }

        // Get related parts for this error code
        const relatedParts = await this.searchParts(errorCode.title);
        
        return {
            errorCode,
            relatedParts: relatedParts.slice(0, 5),
            lastUpdated: new Date().toISOString()
        };
    }

    // Caching and Performance
    async preloadData() {
        if (!this.initialized) await this.initialize();
        
        try {
            // Preload commonly used data
            await Promise.all([
                this.getAllErrorCodes(),
                this.getAllParts(),
                this.getAllSuppliers(),
                this.getMaintenanceSchedule()
            ]);
            
            console.log('Data preloaded successfully');
            return true;
        } catch (error) {
            console.error('Error preloading data:', error);
            return false;
        }
    }

    // Error Handling
    handleError(error, context = '') {
        console.error(`API Error ${context}:`, error);
        return {
            success: false,
            error: error.message,
            context,
            timestamp: new Date().toISOString()
        };
    }

    // Validation
    validateMaintenanceRecord(record) {
        const required = ['type', 'date', 'mileage'];
        const missing = required.filter(field => !record[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        if (record.mileage < 0) {
            throw new Error('Mileage must be positive');
        }
        
        if (record.cost && record.cost < 0) {
            throw new Error('Cost must be positive');
        }
        
        return true;
    }

    validatePart(part) {
        const required = ['name', 'partNumber', 'price', 'supplier'];
        const missing = required.filter(field => !part[field]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }
        
        if (part.price < 0) {
            throw new Error('Price must be positive');
        }
        
        return true;
    }
}

// Export default API instance
export default new CarAPI();