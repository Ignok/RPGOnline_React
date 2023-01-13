import Swal from "sweetalert2";

export const Fail = Swal.mixin({
    icon: 'error',
    title: 'Cannot proceed',
    text: 'Only logged users can perform this action',
    footer: '<a href="/login">Want to log in?</a>'
});