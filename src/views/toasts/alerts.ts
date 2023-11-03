import {alertController} from "@ionic/vue";

export const presentAlert = async (alertMessage: string) => {
    const alert = await alertController.create({
        header: 'Fehler',
        subHeader: 'Aktion nicht erfolgreich',
        message: alertMessage,
        buttons: ['OK'],
    });

    await alert.present();
};

export const presentSuccess = async (successMessage: string) => {
    const success = await alertController.create({
        header: 'Erfolg',
        subHeader: 'Aktion erfolgreich',
        message: successMessage,
        buttons: ['OK'],
    });

    await success.present();
};