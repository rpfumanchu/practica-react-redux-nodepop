import { useEffect } from "react";
import "./DrawTags.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags } from "../../../store/selectors";
import { tagsLoaded } from "../../../store/actions";

const DrawTags = props => {
  const { handleSelectChange, texto, showEmptyOption } = props;
  const tags = useSelector(getAllTags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tagsLoaded([])).catch(error => console.log(error));
  }, [dispatch]);

  return (
    <>
      <div className="filters-tags">
        <select name="tags" multiple onChange={handleSelectChange}>
          {showEmptyOption ? (
            <option disabled value="">
              {texto}
            </option>
          ) : (
            <option value="">{texto}</option>
          )}
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
