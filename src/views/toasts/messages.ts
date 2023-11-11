import Swal from "sweetalert2";

export const success_toast = Swal.mixin({
    toast: true, position: 'center', iconColor: 'green', customClass: {
        popup: 'colored-toast'
    }, showConfirmButton: false, timer: 2500, timerProgressBar: true
});

export const error_toast = Swal.mixin({
    toast: true, position: 'center', iconColor: 'red', customClass: {
        popup: 'colored-toast'
    }, showConfirmButton: false, timer: 2500, timerProgressBar: true
});

export const info_toast = Swal.mixin({
    toast: true, position: 'center', iconColor: 'yellow', customClass: {
        popup: 'colored-toast'
    }, showConfirmButton: false, timer: 2500, timerProgressBar: true
});

export const new_chat_toast = Swal.mixin({
    toast: true, position: 'top-right', iconColor: 'green', customClass: {
        popup: 'colored-toast'
    }, showConfirmButton: false, timer: 1500, timerProgressBar: true
});


export const aufnahmeGestartetToast = Swal.mixin({
    toast: true, position: 'top-right', iconColor: 'green', customClass: {
        popup: 'colored-toast'
    }, showConfirmButton: false, timer: 1500, timerProgressBar: true
});