import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('waymatri_mm_studio_prod', 'waymatri_mmw2w', 'Santhosh@1997', {
    host: '135.181.211.87',
    dialect: 'mysql',
    logging: false,
});

export default sequelize;
