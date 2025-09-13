// Database Schema and Management for Mitsubishi ASX 2011
// Comprehensive data structure for all car information

export class CarDatabase {
    constructor() {
        this.carInfo = {
            make: 'Mitsubishi',
            model: 'ASX',
            year: 2011,
            engine: '4B11',
            displacement: '2.0L',
            fuelType: 'Бензин',
            transmission: 'АКПП',
            driveType: 'Передний привод',
            bodyType: 'Кроссовер',
            doors: 5,
            seats: 5,
            fuelCapacity: '63 литра',
            weight: '1420 кг',
            dimensions: {
                length: '4295 мм',
                width: '1770 мм',
                height: '1615 мм',
                wheelbase: '2670 мм'
            }
        };

        this.schema = {
            errorCodes: {
                table: 'error_codes',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    code: 'TEXT UNIQUE NOT NULL',
                    title: 'TEXT NOT NULL',
                    description: 'TEXT',
                    symptoms: 'JSON',
                    solutions: 'JSON',
                    difficulty: 'TEXT',
                    time: 'TEXT',
                    cost: 'TEXT',
                    icon: 'TEXT',
                    severity: 'TEXT',
                    category: 'TEXT',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
                    updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            },
            parts: {
                table: 'parts',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    name: 'TEXT NOT NULL',
                    partNumber: 'TEXT UNIQUE NOT NULL',
                    price: 'REAL',
                    currency: 'TEXT DEFAULT "EUR"',
                    supplier: 'TEXT',
                    description: 'TEXT',
                    category: 'TEXT',
                    difficulty: 'TEXT',
                    time: 'TEXT',
                    icon: 'TEXT',
                    inStock: 'BOOLEAN DEFAULT 1',
                    rating: 'REAL',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP',
                    updated_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            },
            suppliers: {
                table: 'suppliers',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    name: 'TEXT UNIQUE NOT NULL',
                    address: 'TEXT',
                    phone: 'TEXT',
                    email: 'TEXT',
                    website: 'TEXT',
                    rating: 'REAL',
                    delivery: 'TEXT',
                    payment: 'JSON',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            },
            maintenance: {
                table: 'maintenance_schedule',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    mileage: 'TEXT NOT NULL',
                    interval: 'TEXT',
                    task: 'TEXT NOT NULL',
                    description: 'TEXT',
                    difficulty: 'TEXT',
                    time: 'TEXT',
                    cost: 'TEXT',
                    tools: 'JSON',
                    parts: 'JSON',
                    icon: 'TEXT',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            },
            repairGuides: {
                table: 'repair_guides',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    title: 'TEXT NOT NULL',
                    difficulty: 'TEXT',
                    time: 'TEXT',
                    cost: 'TEXT',
                    tools: 'JSON',
                    parts: 'JSON',
                    steps: 'JSON',
                    warnings: 'JSON',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            },
            userRecords: {
                table: 'user_records',
                fields: {
                    id: 'INTEGER PRIMARY KEY',
                    type: 'TEXT NOT NULL', // 'maintenance', 'repair', 'purchase'
                    partId: 'INTEGER',
                    supplierId: 'INTEGER',
                    date: 'DATETIME',
                    mileage: 'INTEGER',
                    cost: 'REAL',
                    notes: 'TEXT',
                    created_at: 'DATETIME DEFAULT CURRENT_TIMESTAMP'
                }
            }
        };
    }

    // Initialize database with sample data
    async initialize() {
        try {
            // In a real implementation, this would create actual database tables
            // For now, we'll return a success message
            console.log('Database initialized successfully');
            return true;
        } catch (error) {
            console.error('Error initializing database:', error);
            return false;
        }
    }

    // Error Codes Management
    async addErrorCode(errorCode) {
        const requiredFields = ['code', 'title', 'description', 'symptoms', 'solutions'];
        const missingFields = requiredFields.filter(field => !errorCode[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // In a real implementation, this would insert into database
        console.log('Error code added:', errorCode.code);
        return { success: true, id: Date.now() };
    }

    async getErrorCode(code) {
        // In a real implementation, this would query the database
        const errorCodes = await import('./errorCodes.js');
        const allCodes = Object.values(errorCodes.errorCodes).flat();
        return allCodes.find(ec => ec.code === code) || null;
    }

    async searchErrorCodes(query) {
        const errorCodes = await import('./errorCodes.js');
        const allCodes = Object.values(errorCodes.errorCodes).flat();
        
        return allCodes.filter(ec => 
            ec.code.toLowerCase().includes(query.toLowerCase()) ||
            ec.title.toLowerCase().includes(query.toLowerCase()) ||
            ec.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Parts Management
    async addPart(part) {
        const requiredFields = ['name', 'partNumber', 'price', 'supplier'];
        const missingFields = requiredFields.filter(field => !part[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        console.log('Part added:', part.partNumber);
        return { success: true, id: Date.now() };
    }

    async getPart(partNumber) {
        const parts = await import('./partsCatalog.js');
        const allParts = Object.values(parts.partsCatalog).flat();
        return allParts.find(p => p.partNumber === partNumber) || null;
    }

    async searchParts(query) {
        const parts = await import('./partsCatalog.js');
        const allParts = Object.values(parts.partsCatalog).flat();
        
        return allParts.filter(p => 
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.partNumber.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    async getPartsByCategory(category) {
        const parts = await import('./partsCatalog.js');
        return parts.partsCatalog[category] || [];
    }

    // Suppliers Management
    async addSupplier(supplier) {
        const requiredFields = ['name', 'address', 'phone'];
        const missingFields = requiredFields.filter(field => !supplier[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        console.log('Supplier added:', supplier.name);
        return { success: true, id: Date.now() };
    }

    async getSupplier(name) {
        const suppliers = await import('./partsCatalog.js');
        return suppliers.suppliers[name] || null;
    }

    async getAllSuppliers() {
        const suppliers = await import('./partsCatalog.js');
        return Object.values(suppliers.suppliers);
    }

    // Maintenance Management
    async addMaintenanceRecord(record) {
        const requiredFields = ['type', 'date', 'mileage'];
        const missingFields = requiredFields.filter(field => !record[field]);
        
        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        console.log('Maintenance record added:', record.type);
        return { success: true, id: Date.now() };
    }

    async getMaintenanceSchedule() {
        const maintenance = await import('./maintenance.js');
        return maintenance.maintenanceSchedule;
    }

    async getMaintenanceHistory() {
        // In a real implementation, this would query user records
        return [
            {
                id: 1,
                type: 'maintenance',
                date: '2024-01-15',
                mileage: 150000,
                task: 'Замена масла двигателя',
                cost: 25.50
            },
            {
                id: 2,
                type: 'repair',
                date: '2024-02-10',
                mileage: 152000,
                task: 'Замена тормозных колодок',
                cost: 85.30
            }
        ];
    }

    // Repair Guides Management
    async getRepairGuide(title) {
        const guides = await import('./repairGuides.js');
        return guides.repairGuides[title] || null;
    }

    async getAllRepairGuides() {
        const guides = await import('./repairGuides.js');
        return Object.values(guides.repairGuides);
    }

    // Statistics and Analytics
    async getMaintenanceStats() {
        const history = await this.getMaintenanceHistory();
        const totalCost = history.reduce((sum, record) => sum + record.cost, 0);
        const averageCost = totalCost / history.length;
        
        return {
            totalRecords: history.length,
            totalCost: totalCost,
            averageCost: averageCost,
            lastMaintenance: history[history.length - 1]?.date || null,
            nextMaintenance: this.calculateNextMaintenance(history)
        };
    }

    calculateNextMaintenance(history) {
        // Simple calculation - in reality would be more complex
        const lastRecord = history[history.length - 1];
        if (!lastRecord) return null;
        
        const lastDate = new Date(lastRecord.date);
        const nextDate = new Date(lastDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        
        return nextDate.toISOString().split('T')[0];
    }

    async getPartsStats() {
        const parts = await import('./partsCatalog.js');
        const allParts = Object.values(parts.partsCatalog).flat();
        
        const totalParts = allParts.length;
        const inStockParts = allParts.filter(p => p.inStock).length;
        const averagePrice = allParts.reduce((sum, p) => sum + p.price, 0) / totalParts;
        
        const categoryStats = {};
        Object.keys(parts.partsCatalog).forEach(category => {
            const categoryParts = parts.partsCatalog[category];
            categoryStats[category] = {
                count: categoryParts.length,
                averagePrice: categoryParts.reduce((sum, p) => sum + p.price, 0) / categoryParts.length
            };
        });

        return {
            totalParts,
            inStockParts,
            outOfStockParts: totalParts - inStockParts,
            averagePrice,
            categoryStats
        };
    }

    // Search functionality
    async searchAll(query) {
        const results = {
            errorCodes: await this.searchErrorCodes(query),
            parts: await this.searchParts(query),
            suppliers: await this.searchSuppliers(query)
        };
        
        return results;
    }

    async searchSuppliers(query) {
        const suppliers = await this.getAllSuppliers();
        return suppliers.filter(s => 
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.address.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Data export/import
    async exportData() {
        const data = {
            carInfo: this.carInfo,
            errorCodes: await import('./errorCodes.js'),
            parts: await import('./partsCatalog.js'),
            maintenance: await import('./maintenance.js'),
            repairGuides: await import('./repairGuides.js'),
            userRecords: await this.getMaintenanceHistory(),
            exportDate: new Date().toISOString()
        };
        
        return data;
    }

    async importData(data) {
        try {
            // Validate data structure
            if (!data.carInfo || !data.errorCodes || !data.parts) {
                throw new Error('Invalid data format');
            }

            // In a real implementation, this would import into database
            console.log('Data imported successfully');
            return { success: true };
        } catch (error) {
            console.error('Error importing data:', error);
            return { success: false, error: error.message };
        }
    }
}

// Export default database instance
export default new CarDatabase();