import { cp } from "shelljs";

// Copy env files so that compiled js code can access them
cp("-R", "config/", "dist/");

//cp("-R", "src/public/js/lib", "dist/public/js/");
//cp("-R", "src/public/fonts", "dist/public/");
//cp("-R", "src/public/images", "dist/public/");
