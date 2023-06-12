import { Body, Controller, Post, Put, Delete, Get, Param, NotFoundException } from "@nestjs/common";
import { PusherService } from "./app.service";
import { User } from "./app.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller("api")
export class AppController {
  constructor(private pusherService: PusherService,
  @InjectRepository(User)
  private userRepository: Repository<User>,
  ){}

  @Post('messages')
  async createMessage(
    @Body('username') username: string,
    @Body('message') message: string,
  ) {
    if (!username || !message) {
      return { success: false, error: 'Username and message are required' };
    }
  
    const newUser = new User();
    newUser.username = username;
    newUser.messages = message;
  
    const savedUser = await this.userRepository.save(newUser);
  
    // Envoi d'une notification en temps réel aux clients via Pusher
    await this.pusherService.trigger('chat', 'messageCreated', {
      id: savedUser.id,
      username: savedUser.username,
      message: savedUser.messages,
    });
  
    return { success: true, id: savedUser.id };
  }
  
  
  
  
  

  @Get("messages")
  async getAllMessages() {
    const messages = await this.userRepository.find();
    return messages;
  }

  @Get("messages/:id")
  async getMessageById(@Param("id") id: string) {

    
    return ;
  }
  

  @Put("messages/:id")
  async updateMessage(
    @Param("id") id: string,
    @Body("message") message: string
  ) {
    // Logique de mise à jour du message en fonction de l'ID
    // ...

    // Envoi d'une notification en temps réel aux clients via Pusher
    await this.pusherService.trigger("chat", "messageUpdated", {
      id,
      message
    });

    return { success: true };
  }

  @Delete("messages/:id")
  async deleteMessage(@Param("id") id: string) {
    // Logique de suppression du message en fonction de l'ID
    // ...

    // Envoi d'une notification en temps réel aux clients via Pusher
    await this.pusherService.trigger("chat", "messageDeleted", {
      id
  });

    return { success: true };
  }
}
