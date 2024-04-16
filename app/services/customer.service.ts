import Customer from '../entities/customer.js'
import { CreateCustomerDto } from '../types/create-customer.js'
import CustomerAlreadyExistsException from '#exceptions/customer-already-exists.exception'
import CustomerNotFoundException from '#exceptions/customer-not-found'
import Sell from '../entities/sell.js'

export class CustomerService {
  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    const prevCustomer = await Customer.findBy('cpf', dto.cpf)
    if (prevCustomer) throw new CustomerAlreadyExistsException()
    const customer = new Customer()
    customer.fullName = dto.fullName
    customer.email = dto.email
    customer.cpf = dto.cpf
    customer.phone = dto.phone
    customer.address = dto.address
    return await customer.save()
  }

  async index(): Promise<Customer[] | null> {
    const query = Customer.query()
      .select('customers.id', 'fullName', 'email', 'customers.created_at')
      .orderBy('customers.id', 'desc')

    return await query
  }

  async findById(
    id: string,
    filters?: {
      date: string
    }
  ): Promise<Customer | null> {
    const query = Customer.query()
      .where('id', id)
      .preload('sales', (query) => {
        query.orderBy('created_at', 'desc')
        if (filters?.date) {
          const [month, year] = filters.date.split('-')
          query.whereRaw(
            'EXTRACT(YEAR FROM created_at) = ? AND EXTRACT(MONTH FROM created_at) = ?',
            [year, month]
          )
        }
      })

    return await query.first()
  }

  async update(id: string, dto: CreateCustomerDto): Promise<Customer | null> {
    const customer = await Customer.find(id)
    if (!customer) throw new CustomerNotFoundException()
    customer.fullName = dto.fullName
    customer.email = dto.email
    customer.cpf = dto.cpf
    customer.phone = dto.phone
    customer.address = dto.address
    return await customer.save()
  }

  async delete(id: string): Promise<void> {
    const customer = await Customer.find(id)
    if (!customer) throw new CustomerNotFoundException()
    await Sell.query().where('customerId', id).delete()
    await customer.delete()
  }
}
