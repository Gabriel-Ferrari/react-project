import './styles.css';

export const Input = ({ searchValue, handleChange }) => {
    return (
        <input placeholder='Digite o nome do(s) post(s)' type='search' value={searchValue} onChange={handleChange} />
    )
}