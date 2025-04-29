const DriverService = require('../services/driver.service');

class DriverController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const photo = req.file?.path;

    if (!name || !email || !password || !photo) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      const driver = await DriverService.register({ name, email, password, photo });
      res.status(201).json({ driver });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Registration failed' });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const { token, driver } = await DriverService.login(email, password);
      res.json({ token, driver });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: error.message || 'Login failed' });
    }
  }

  static async listAll(req, res) {
    try {
      const drivers = await DriverService.listAll();
      res.json(drivers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Could not fetch drivers' });
    }
  }
}

module.exports = DriverController;
