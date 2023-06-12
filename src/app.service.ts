import { Injectable } from "@nestjs/common";
import * as Pusher from "pusher";

@Injectable()
export class PusherService {
  pusher: Pusher;
  

  constructor() {
    this.pusher = new Pusher({
      appId: "1615833",
      key: "ebce9d26533cc1d5184d",
      secret: "610a609e61db45f94d21",
      cluster: "eu",
      useTLS: true

    });
  }

  async trigger(channel: string, event: string, data: any) {
    await this.pusher.trigger(channel, event, data);
 }
}
