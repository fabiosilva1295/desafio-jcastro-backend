import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://fancisfabiosilva:naruto5997@cluster0.wgutknb.mongodb.net/'),
    ContactsModule,
  ],
})
export class AppModule {}
