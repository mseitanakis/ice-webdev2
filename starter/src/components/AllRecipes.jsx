import { useEffect, useState } from "react";
import Recipe from "./Recipe";

import Stopwatch from "../utils/Stopwatch";
import { Col, Container, Pagination, Row } from "react-bootstrap";


Stopwatch.start();

export default function AllRecipes(props) {

    // Is there a better way to do this? We'll explore this today!
    // const [pizza, setPizza] = useState();
    // const [pasta, setPasta] = useState();
    // const [chili, setChili] = useState();

    const [p, setP] = useState(1);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        // Which fetch will complete first? No one knows!

        fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/all-recipes", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(data => {
            setRecipes(data);
            // console.log(Stopwatch.get(), "Received pizza; remember, it will not be set quite yet!", pizza);
        })

        // fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/pasta", {
        //     headers: {
        //         "X-CS571-ID": CS571.getBadgerId()
        //     }
        // })
        // .then(res => res.json())
        // .then(data => {
        //     setPasta(data);
        //     // console.log(Stopwatch.get(), "Received pasta; remember, it will not be set quite yet!", pasta);
        // })

        // fetch("https://cs571api.cs.wisc.edu/rest/f24/ice/chili", {
        //     headers: {
        //         "X-CS571-ID": CS571.getBadgerId()
        //     }
        // })
        // .then(res => res.json())
        // .then(data => {
        //     setChili(data);
        //     // console.log(Stopwatch.get(), "Received chili; remember, it will not be set quite yet!", chili);
        // })

        // console.log(Stopwatch.get(), "The AllRecipes component has mounted.")

        // return () => {
        //     console.log(Stopwatch.get(), "The AllRecipes component has unmounted.")
        // }
    }, []);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, pizza has been set.", pizza)
    // }, [pizza]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, pasta has been set.", pasta)
    // }, [pasta]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, chili has been set.", chili)
    // }, [chili]);

    // useEffect(() => {
    //     console.log(Stopwatch.get(), "Now, something has changed in AllRecipes!")
    // }, [chili, pizza, pasta]);

    // useEffect(() => {
    //     if (chili && pizza && pasta) {
    //         console.log(Stopwatch.get(), "Now, everything has been set in AllRecipes!")
    //     }
    // }, [chili, pizza, pasta]);

    // console.log(Stopwatch.get(), "AllRecipes is rendering!")

    const paginatedData = recipes.slice((p - 1) * 3, p * 3)


    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <Container>
            <Row>
                {paginatedData.map(r => <Col key={r.name} xs={12} md={6} lg={4}>
                    <Recipe  {...r}/>
                </Col>)}
            </Row>
        </Container>
        
        <Pagination>
            <Pagination.Item active={p === 1} onClick={() => setP(1)}>1</Pagination.Item>
            <Pagination.Item active={p === 2} onClick={() => setP(2)}>2</Pagination.Item>
        </Pagination>

    </div>
}