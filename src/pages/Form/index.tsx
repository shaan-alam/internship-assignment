import { TextField, Button } from "@mui/material";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export interface IUser {
  name: string;
  email: string;
  phone: string;
}

const Form = () => {
  const navigate = useNavigate();
  const formik = useFormik<IUser>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Please provide a valid email")
        .required("Email is required"),
      phone: yup.string().required("Phone number is required"),
    }),
    onSubmit: (res) => {
      localStorage.setItem("user", JSON.stringify(res));
      navigate("/data");
    },
  });

  return (
    <section className={styles.form_section}>
      <div className={styles.form}>
        <h1>Form</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.form_field}>
            {formik.touched.name && formik.errors.name && (
              <span className={styles.error}>{formik.errors.name}</span>
            )}
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              fullWidth
              {...formik.getFieldProps("name")}
            />
          </div>
          <div className={styles.form_field}>
            {formik.touched.phone && formik.errors.phone && (
              <span className={styles.error}>{formik.errors.phone}</span>
            )}

            <TextField
              id="standard-basic"
              label="Phone Number"
              variant="standard"
              fullWidth
              {...formik.getFieldProps("phone")}
            />
          </div>
          <div className={styles.form_field}>
            {formik.touched.email && formik.errors.email && (
              <span className={styles.error}>{formik.errors.email}</span>
            )}
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              type="email"
              fullWidth
              {...formik.getFieldProps("email")}
            />
          </div>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Form;
