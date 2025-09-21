
import toast from "react-hot-toast";

import style from "./Form.module.css";
import { useState } from "react";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const [query, setQuerty] = useState('');
  
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query.trim());
    setQuerty('');
  };

  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="Search images..."
        name="query"
        autoFocus
        value={query}
        onChange={(e) => setQuerty(e.target.value)}
      />

      <button className={style.button} type="submit">
        
      </button>
    </form>
  );
}
