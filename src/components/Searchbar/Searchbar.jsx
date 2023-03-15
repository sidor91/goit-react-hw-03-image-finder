import css from './Searchbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai'

 const Searchbar = ({ onSubmit }) => {
   return (
     <header className={css.searchbar}>
       <form className={css.searchForm} onSubmit={onSubmit}>
         <button type="submit" className={css.searchFormButton}>
           <AiOutlineSearch className={css.searchFormIcon} />
           <span className={css.searchFormButtonLabel}>Search</span>
         </button>

         <input
           className={css.searchFormInput}
           type="text"
           autoComplete="off"
           autoFocus
           placeholder="Search images and photos"
         />
       </form>
     </header>
   );
 };

export default Searchbar;
 
