const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

class DriverService {
  static async register({ name, email, password, photo }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await prisma.driver.create({
      data: {
        name,
        email,
        password: hashedPassword,
        photo
      }
    });

    return driver;
  }

  static async login(email, password) {
    const driver = await prisma.driver.findUnique({ where: { email } });

    if (!driver) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, driver.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: driver.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { token, driver };
  }

  static async listAll() {
    return prisma.driver.findMany();
  }
}

module.exports = DriverService;
