"use server";
import {WebClient} from "@slack/web-api";
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function sendSlackNotification(channel: string, message: string) {
  try {
    await slack.chat.postMessage({
      channel: channel,
      text: message,
    });
    return {message: "Success"};
  } catch (error) {
    console.log(error);
    return {error: "Couldn't send message"};
  }
}
