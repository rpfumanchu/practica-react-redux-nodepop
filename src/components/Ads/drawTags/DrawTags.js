import { useEffect } from "react";
import { useState } from "react";
import { getTags } from "../service";
import "./DrawTags.css";

const DrawTags = props => {
  const { handleSelectChange } = props;
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      const tags = await getTags();

      setTags(tags);
    }
    fetchTags();
  }, []);

  return (
    <>
      <div className="filters-tags">
        <select name="tags" multiple onChange={handleSelectChange}>
          <option value={""}>todos los Tags</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <small className="small">
        manten pulsado control para seleccionar màs de un Tag
      </small>
    </>
  );
};

export default DrawTags;
