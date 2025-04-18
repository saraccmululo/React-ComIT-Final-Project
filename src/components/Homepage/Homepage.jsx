import { useState, useRef, useEffect } from 'react';
import useSortedAndFilteredPlants from '../../hooks/useSortedAndFilteredPlants.js';
import useFetchPlantsApi from '../../hooks/useFetchPlantsApi.js';
import Header from '../shared/Header/Header.jsx';
import NavHeader from '../shared/Header/NavHeader.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SortFilter from '../SortFilter/SortFilter.jsx';
import Pagination from '../shared/Pagination/Pagination.jsx';
import Footer from '../shared/Footer/Footer.jsx';
import styles from './HomePage.module.css';

const Homepage = ({showMenu, toggleMenu, closeMenu, isDashboard}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('none');
    const [filterType, setFilterType] = useState('none');
    const [filterText, setFilterText] = useState('');
    const searchInputRef = useRef(null);
 
  useEffect(() => {
    document.title = "Homepage";
  }, [])

  const { plantsData, isLoading } = useFetchPlantsApi(searchTerm);

  const handleSearch = () => {
    if (searchInputRef.current) {
      setSearchTerm(searchInputRef.current.value);
      searchInputRef.current.value ='';
    }
  };
  
  const sortedAndFilteredPlants = useSortedAndFilteredPlants(plantsData, filterType, filterText, sortBy);

  return (
    <section className={styles.homeContainer}>
      <section className={styles.container}>
        <Header />
        <NavHeader 
          showMenu={showMenu}
          toggleMenu={toggleMenu}
          closeMenu={closeMenu}
          isDashboard={isDashboard}/>
        <main>
        <h2 className={styles.homeH2}>The help you need to manage your plant collection!</h2>
        <SearchBar 
          searchInputRef = {searchInputRef} 
          onSearch={handleSearch}
        />
        <SortFilter
          sortBy={sortBy}
          filterType={filterType}
          filterText={filterText}
          setSortBy={setSortBy}
          setFilterType={setFilterType}
          setFilterText={setFilterText}
          filteredPlants={sortedAndFilteredPlants}
          isHomepage={true} 
        />
        <Pagination 
          filteredPlants={sortedAndFilteredPlants}
          searchTerm={searchTerm}
          filterType={filterType}
          filterText={filterText}
          isLoading={isLoading}
          isDashboard={false} 
        />
        </main>
        </section> 
        <Footer />
      </section>
  );
};

export default Homepage;