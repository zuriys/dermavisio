'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prediksi', {
      id_prediksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengguna: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pengguna',     // Nama tabel orang tua
          key: 'id_pengguna'    // Kolom kunci di tabel orang tua
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'     // Jika user dihapus, history ikut terhapus
      },
      hasil: {
        type: Sequelize.STRING(100),
        allowNull: false        // Contoh: "Melanoma"
      },
      confidence: {
        type: Sequelize.FLOAT,  // Contoh: 0.98 atau 98.0
        allowNull: true
      },
      image_url: {
        type: Sequelize.STRING(255),
        allowNull: true         // Link atau path foto yang diupload
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prediksi');
  }
};