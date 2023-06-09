import { Card, FormLayout, Page, RadioButton, TextField } from "@shopify/polaris";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertPop } from "../../../../Global/Alert";

function Edithotel() {
    const { state } = useLocation();
    const history = useNavigate();
    const { hotel_name, single, location, id } = state;
    const [hotelname, sethotelname] = useState(hotel_name);
    const [Double, setDouble] = useState<any>();
    const [Loaction, setLoaction] = useState(location);
    const [rating, setRating] = useState(state.rating);
    const [description, setdescription] = useState(state.description);

  
    useEffect(() => {
        single === true ? setDouble('single') : setDouble('double')
    }, [])

    const updateHotel = () => {
        const config = {
            method: "put",
            url: "http://localhost:3001/api/updatehotel/" + id,
            withCredentials: true,
            data: {
                hotel_name: hotelname,
                description: description,
                single: Double === "single" ? true : false,
                double: Double === "double" ? true : false,
                location: Loaction,
                rating: Number(rating)
            },
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            if (res.data.status) {
                AlertPop("Updated", "Sucessfuly Updated", "success");
            }
        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }

    return (
        <Page
            title="Edit Hotel">
            <Card
                sectioned
                primaryFooterAction={
                    {
                        content: "save",
                        onAction: () => updateHotel()
                    }
                }
                secondaryFooterActions={[
                    {
                        content: "Cancel",
                        onAction: () => history(-1)
                    }
                ]}>
                <FormLayout>
                    <TextField
                        requiredIndicator
                        label="Hotel Name"
                        autoComplete="off"
                        placeholder="Enter Hotel Name"
                        value={hotelname}
                        onChange={(e: any) => { sethotelname(e) }} />
                    <RadioButton
                        id="double"
                        checked={Double === "double"}
                        label="Double"
                        onChange={(_: any, id: any) => setDouble(id)}
                    />
                    <RadioButton
                        id="single"
                        checked={Double === "single"}
                        label="Single"
                        value={Double}
                        onChange={(_: any, id: any) => setDouble(id)}
                    />
                    {/* <Checkbox
                        checked={Single}
                        id="active"
                        onChange={(check: any) => setSingle(check)}
                        label="Single" /> */}

                    {/* <Checkbox
                        checked={Double}
                        id="active"
                        onChange={(check: any) => setDouble(check)}
                        label="Double" /> */}
                    <TextField
                        requiredIndicator
                        label="Hotel Location"
                        autoComplete="off"
                        placeholder="Enter Hotel Location"
                        value={Loaction}
                        onChange={(e: any) => { setLoaction(e) }} />
                    <TextField
                        requiredIndicator
                        label="Hotel Rating"
                        autoComplete="off"
                        placeholder="Enter Hotel Rating"
                        value={rating}
                        onChange={(e: any) => { setRating(e) }} />
                    <TextField
                        label="Loaction Description"
                        autoComplete="off"
                        placeholder="Enter Loaction Description"
                        value={description}
                        multiline={true}
                        onChange={(e: any) => { setdescription(e) }} />
                </FormLayout>
            </Card>
        </Page>
    );
}

export default Edithotel;