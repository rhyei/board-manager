import UserController from '@/controllers/user.controller'
import authMiddleware from '@/middleware/auth.middleware'
import TokenService from '@/services/token.service'
import UserRepository from '@/services/user/user.repository'
import UserService from '@/services/user/user.service'
import DataController from '@controllers/data.controller'
import InspectionController from '@controllers/inspection.controller'
import InventoryController from '@controllers/inventory.controller'
import DataService from '@services/data.service'
import InspectionService from '@services/inspection.service'
import InventoryService from '@services/inventory.service'
import prisma from '@utils/prisma'
import { Router } from 'express'

const inventoryService = new InventoryService(prisma)
const dataService = new DataService()
const userRepository = new UserRepository(prisma)
const inspectionService = new InspectionService(prisma, dataService)
const tokenService = new TokenService(prisma)
const userService = new UserService(userRepository, tokenService, prisma)

const inspectionController = new InspectionController(inspectionService)
const inventoryController = new InventoryController(inventoryService)
const dataController = new DataController(dataService)
const userController = new UserController(userService)

const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh', userController.refresh)

router.post('/inspection/:worker', authMiddleware, inspectionController.saveInspectionRecord)
router.delete('/inspection/:id', inspectionController.deleteInspectionRecord)

router.post('/inventory/:worker', authMiddleware, inventoryController.saveInventoryRecord)
router.delete('/inventory/:id', inventoryController.deleteInventoryRecord)

router.get('/data', dataController.fetchData)

export default router
