import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateContactDto } from '../dto/create-contact.dto';
import { MarkFavoriteDto } from '../dto/mark-favorite.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactsService } from '../services/contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    console.log(createContactDto)
    const phoneExists = await this.contactsService.phoneExists(createContactDto.celular);
  
    if (phoneExists) {
      throw new BadRequestException('Número já cadastrado.');
    }

    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.contactsService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }

  @Put(':id/favorite')
  markFavorite(@Param('id') id: string, @Body() markFavoriteDto: MarkFavoriteDto) {
    console.log('aqui', markFavoriteDto)
    return this.contactsService.markFavorite(id, markFavoriteDto);
  }

  @Put(':id/active')
  setActiveStatus(@Param('id') id: string, @Body() active: boolean) {
    return this.contactsService.setActiveStatus(id, active);
  }

  @Get('recent')
  getRecentContacts() {
    return this.contactsService.getRecentContacts();
  }

  @Get('exists/:phone')
  async checkPhoneExists(@Param('phone') phone: string): Promise<{ exists: boolean }> {
    const exists = await this.contactsService.phoneExists(phone);
    return { exists };
  }
}
