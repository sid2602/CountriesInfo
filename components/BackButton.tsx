import Link from "next/link";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function BackButton() {
  return (
    <Link href="/">
      <Button component="a" variant="contained" color="primary">
        {" "}
        <ArrowBackIcon /> Menu
      </Button>
    </Link>
  );
}
