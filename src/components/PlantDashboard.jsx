import { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebase';
import logo from '../assets/logo-without-background.png';
import PlantCard from './PlantCard';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PlantDashboard = () => {
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		if (auth.currentUser) {
			const plantRef = db.collection("plants").doc(auth.currentUser.uid).collection("userPlants");
			plantRef.get().then((querySnapshot) => {
				const plantsData = [];
				querySnapshot.forEach((doc) => {
					plantsData.push(doc.data());
				});
				console.log("Fetched plants:", plantsData);  // Check if the plants are being fetched
				setPlants(plantsData);
			}).catch((error) => {
				console.error("Error fetching plants: ", error);
			});
		}
	}, []);

	const handleDelete = async (plantId) => {
    if (auth.currentUser) {
      try {
        const plantDocRef = doc(db, "plants", auth.currentUser.uid, "userPlants", plantId);
        await deleteDoc(plantDocRef);

				// Remove the deleted plant from the state to update the UI
				setPlants(plants.filter(plant=>plant.id !== plantId));
			} catch (error) {
        console.error("Error removing plant: ", error);
      }
		}
	};
	
	return (
	<section className="container">
		<header>
			<figure className="logo-title"> 
				<Link className="plant-collection-link" to="/">
					<img src={logo} alt="Plant Pals Logo" className="logo" />
						<figcaption>
							<h1>My Plant Pals</h1>
						</figcaption>
				</Link>
			</figure>
		</header>
		<main>
		<h2>My plant collection</h2>
		<ul className="plant-list">
			{plants.length >0 ? (
          plants.map((plant) => (
            <li key={plant.id}>
              <PlantCard key={plant.id} plant={plant} onDelete={handleDelete} isDashboard={true} />
            </li>
          ))
				) : (
					<p> No plants added yet.</p>
				)}
		</ul>
		</main>
		<Footer />
	</section>
	);
}

export default PlantDashboard;