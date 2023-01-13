import Swal from "sweetalert2";

export const Fail = Swal.mixin({
    icon: 'error',
    title: 'Cannot proceed',
    text: 'Only logged users can perform this action',
    showCancelButton: true,
    confirmButtonText: "Log in"
});