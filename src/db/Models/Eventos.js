const { DataTypes, Model } = require('sequelize');

module.exports = class Eventos extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            evento: { type: DataTypes.STRING },
            dia: { type: DataTypes.STRING },
            mes: { type: DataTypes.STRING },
            hora: { type: DataTypes.STRING },
            min: { type: DataTypes.STRING },
            authorId: { type: DataTypes.STRING }
            
        }, {
            tableName: 'Eventos',
            timestamps: true,
            sequelize
        });
    }
}