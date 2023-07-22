import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./styles.module.scss";

interface DepartmentProps {
  department: {
    department: string;
    sub_departments: string[];
  };
}

const Department: React.FC<DepartmentProps> = ({ department }) => {
  const [areSubDeptVisible, setSubDeptVisible] = useState(false);

  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<
    string[]
  >([]);

  const handleSelectDepartment = (
    department: string,
    sub_departments: string[]
  ) => {
    if (selectedDepartments.includes(department)) {
      // If the department is already selected and is present in the selectedDepartments list, then remove it
      setSelectedDepartments((prevSelected) => {
        return prevSelected.filter((dept) => dept !== department);
      });

      // Also remove all sub departments corresponding to it.
      setSelectedSubDepartments((prevSelected) => {
        let arr: string[] = [];

        prevSelected.forEach((subDept) => {
          if (!sub_departments.includes(subDept)) {
            arr.push(subDept);
          }
        });

        return arr;
      });
    } else {
      // Add a department to the list if not already added
      setSelectedDepartments((depts) => [...depts, department]);

      // Also add all the sub departments corresponding to it
      setSelectedSubDepartments((subDepts) =>
        Array.from(new Set([...subDepts, ...sub_departments]))
      );
    }
  };

  const handleSelectSubDepartment = (subDept: string, department: string) => {
    if (selectedSubDepartments.includes(subDept)) {
      // If the sub-department is already selected and present in the selectedSubDeparment, then unselect it and remove it from selectedSubDeparment
      setSelectedSubDepartments((prevSelected) => {
        return prevSelected.filter((sdept) => sdept !== subDept);
      });

      // Also unselect its parent department
      setSelectedDepartments((depts) => depts.filter((d) => d !== department));
    } else {
      setSelectedSubDepartments((prevSelected) =>
        Array.from(new Set([...prevSelected, subDept]))
      );
    }
  };

  return (
    <div className={styles.department}>
      <div className={styles.department_header}>
        <span onClick={() => setSubDeptVisible(!areSubDeptVisible)}>
          {areSubDeptVisible ? <RemoveIcon /> : <AddIcon />}
        </span>
        <input
          type="checkbox"
          checked={
            selectedSubDepartments.length === department.sub_departments.length
          }
          onChange={() =>
            handleSelectDepartment(
              department.department,
              department.sub_departments
            )
          }
        />
        <p>
          {department.department}
          <span>({department.sub_departments.length})</span>
        </p>
      </div>
      {areSubDeptVisible && (
        <div className={styles.sub_departments}>
          <ul>
            {department.sub_departments.map((subDept) => (
              <li>
                <input
                  type="checkbox"
                  checked={selectedSubDepartments.includes(subDept)}
                  onChange={() =>
                    handleSelectSubDepartment(subDept, department.department)
                  }
                />
                {subDept}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Department;
