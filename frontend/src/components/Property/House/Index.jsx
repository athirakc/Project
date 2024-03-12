import React, { useState } from "react";
import { Container } from "@mui/system";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import Houses from "../../../data/house";

function House() {
  const [openMkdal, setOpenModal] = useState(false);
  const [data, setData] = useState();

  return (
    <Container maxWidth="xl" sx={{ margin: "20px 0px 0px 0px" }}>
      <Grid maxWidth="xl" spacing={7} container>
        {Houses.map((item) => {
          return (
            <Grid
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.4}
              item
              WidthFull
            >
              <Card WidthFull>
                <CardMedia
                  component="img"
                  alt=""
                  height={160}
                  image={item.image}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    Beach House
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex" }} WidthFull>
                  <Button
                  onClick={() => {
                    let data = {
                      title: item.title,
                      description: item.description,
                      Location: item.Location,
                      price: item.price,
                      image: item.image,
                    };
                    setData(data);
                    console.log(data);
                    setOpenModal(true);
                  }}
                    variant="contained"
                    sx={{
                      fontSize: "12px",
                      positon: "relative",
                      right: "0px",
                      textTransform: "none",
                    }}
                    fullWidth
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}

        <Modal
          open={openMkdal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Card>
            <CardMedia component="img" alt="image" image={data?.image} height="300" />
            <CardContent>
              <Typography align="center">Title: {data?.title}</Typography>
              <Typography align="center">Description: {data?.description}</Typography>
              <Typography align="center">Location: {data?.Location}</Typography>
              <Typography align="center">Price: ${data?.price} </Typography>
              <Typography align="center" fontWeight="bold">Property for Sell</Typography>
            </CardContent>
          </Card>
        </Modal>
      </Grid>
    </Container>
  );
}

export default House;
