import { Body, Controller, Post, Put, Delete, Get, Param } from "@nestjs/common";
import { PusherService } from "./app.service";

@Controller("api")
export class AppController {
  constructor(private pusherService: PusherService) {}

  @Post("messages")
  async createMessage(
    @Body("username") username: string,
    @Body("message") message: string
  ) {
    // Logique de création du message
    // Envoi d'une notification en temps réel aux clients via Pusher
    await this.pusherService.trigger("chat", "messageCreated", {
      username,
      message
    });

    return { success: true };
  }

  @Get("messages")
  async getAllMessages() {
    // Logique de récupération de tous les messages
    // ...

    return []; // Retournez les messages récupérés depuis la base de données ou tout autre moyen de stockage
  }

  @Get("messages/:id")
  async getMessageById(@Param("id") id: string) {
    // Logique de récupération d'un message en fonction de l'ID
    // ...

    return {}; // Retournez le message récupéré depuis la base de données ou tout autre moyen de stockage
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
