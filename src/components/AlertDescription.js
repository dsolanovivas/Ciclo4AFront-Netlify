import Swal from "sweetalert2";

export const AlertDescription = (title, descrip, icon) => {
  Swal.fire(title, descrip, icon);
};
