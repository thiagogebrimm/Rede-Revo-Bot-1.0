const { DataTypes, Model } = require('sequelize');

module.exports = class Ticket extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            authorId: { type: DataTypes.STRING },
            tempo: { type: DataTypes.STRING },
            tempoMS: { type: DataTypes.INTEGER },
            reaction: { type: DataTypes.STRING },
            premio: { type: DataTypes.TEXT },
            winner: { type: DataTypes.TEXT },
            message: { type: DataTypes.STRING },
            canal: { type: DataTypes.STRING },
            finalizado: { type: DataTypes.BOOLEAN }
        }, {
            tableName: 'Sorteios',
            timestamps: true,
            sequelize
        });
    }
}