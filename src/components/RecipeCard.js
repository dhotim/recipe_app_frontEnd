import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import defImage from "../images/defImage.png";
import { useHistory } from "react-router";
import { localRoutes } from "./constants";

const useStyles = makeStyles({
  root: {
    width: 245,
    margin: "20px",
  },
});

const RecipeCard = ({ recipeId, imageURL, imageTitle, recipeName }) => {
  const history = useHistory();
  const classes = useStyles();

  function imgError(image) {
    image.target.src = defImage;
  }

  const handleView = () => {
    history.push(`${localRoutes.details}/${recipeId}`);
  };

  return (
    <Card className={classes.root} variant="outlined" onClick={handleView}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Delicous Recipe"
          height="150"
          image={imageURL === "" ? defImage : imageURL}
          onError={imgError}
          title={imageTitle}
        />
        <CardContent>
          <Typography>{recipeName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
