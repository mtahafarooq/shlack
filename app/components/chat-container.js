import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import fetch from 'fetch';
import { inject as service } from '@ember/service';
import AuthService from 'shlack/services/auth';

export default class ChatContainerComponent extends Component {
    @tracked
    messages = [];

    /**
     * @type {AuthService}
     */
    @service auth;

    @action
    async loadMessages() {
        const { 
            channel : {  id, teamId },
         } = this.args;
         
        const response = await fetch(`/api/teams/${teamId}/channels/${id}/messages`);
        this.messages = await response.json();

    }
    @action
    async deleteMessage(messageId){
        const response = await fetch(`/api/messages/${messageId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
        })
        if(!response.ok) throw Error('Could not save the chat message')

        const messageIds = this.messages.map(m =>  m.id);
        const idxToDelete = messageIds.indexOf(messageId);
        this.messages.splice(idxToDelete,1);
        this.messages = this.messages; //necessary for tracked
    }

    @action
    async createMessage(body) {
        const { 
            channel : {  id:channelId, teamId },
         } = this.args;
         const userId = this.auth.currentUserId;
         const response = await fetch('/api/messages',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                 teamId,
                 channelId,
                 userId,
                 body
             })
         })

         if(!response.ok) throw Error('Could not save the chat message')

         const messageData = await response.json();
         const user = await (await fetch(`/api/users/${userId}`)).json();
         this.messages = [
             ...this.messages,
             {...messageData, user}
         ]
    }
}
