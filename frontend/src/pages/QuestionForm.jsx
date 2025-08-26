import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

function QuestionForm() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: authUser._id,
  });

  const { mutate: question, isPending, isError, error } = useMutation();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleInputChange}
        value={formData.email}
      />

      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleInputChange}
        value={formData.password}
      />

      <input type="submit" value="login" />
    </form>
  );
}
export default QuestionForm;
