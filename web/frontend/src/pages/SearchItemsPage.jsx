import React from "react"
import Container from "@mui/material/Container";
import {Grid, Slider, Stack, TextField, FormControlLabel, Checkbox} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomAccordion from "../components/CustomAccordion";

const SearchItemsPage = () => {
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [ratingRange, setRatingRange] = React.useState([0, 5]);
  const [label, setLabel] = React.useState([]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    console.log(priceRange)
  };

  const handleRatingChange = (event, newValue) => {
    setRatingRange(newValue);
    console.log(ratingRange)
  };

  const isChecked = (value) => {
    return label.includes(value);
  }

  const handle = (event) => {
    const curr = event.target.name

    if (event.target.checked) {
      label.push(curr)
    }
    else {
      const index = label.indexOf(curr);
      if (index > -1) {
        label.splice(index, 1);
      }
    }

    setLabel(label)
  }

  console.log(label)

  return (
    <Container maxWidth="lg" sx={{my: 5}}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={3}>
          <Box sx={{backgroundColor: 'white', paddingX: '1rem', paddingY: '2rem'}}>
            <Stack spacing={2}>
              <TextField id="filled-basic" label="Search" variant="standard" sx={{mb: '1rem'}}/>
              <CustomAccordion title='Price'>
                <Stack spacing={2} direction="row">
                  <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    step={50}
                    min={0}
                    max={1000}
                  />
                </Stack>
              </CustomAccordion>
              <CustomAccordion title='Rating'>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={ratingRange}
                  onChange={handleRatingChange}
                  valueLabelDisplay="auto"
                  step={0.1}
                  min={0}
                  max={5}
                  disableSwap
                />
              </CustomAccordion>
              <CustomAccordion title='Brand'>
                <Box sx={{maxHeight: 200, overflowY: 'auto'}}>
                  <Stack>
                    <FormControlLabel
                      label="End"
                      control={
                      <Checkbox
                        checked={isChecked('End')}
                        onChange={handle}
                      />
                      }
                    />
                  </Stack>
                </Box>
              </CustomAccordion>
              <CustomAccordion title='Carrier'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
              <CustomAccordion title='Operating System'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
              <CustomAccordion title='Color'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
              <CustomAccordion title='Screen Size'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
              <CustomAccordion title='Storage Capacity'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
              <CustomAccordion title='Cellular Connectivity'>
                <Typography>
                  Meter lista checkboxes
                </Typography>
              </CustomAccordion>
            </Stack>
          </Box>
        </Grid>
        <Grid item sm={12} md={9}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus nibh turpis, quis dapibus nunc convallis
            egestas. Vivamus non magna ut nibh mollis consectetur. Fusce risus odio, interdum nec imperdiet quis,
            ultricies
            eget nisl. Nulla imperdiet quis odio sit amet maximus. Praesent pellentesque, ex non pretium fermentum, dui
            mauris congue est, et vulputate ex nibh finibus sapien. Duis commodo egestas quam vel auctor. Nunc justo
            urna,
            fermentum ut nisi in, maximus commodo est. Nulla facilisi. Integer ac enim sit amet lacus tincidunt
            pellentesque. Donec tempus erat quis ante tincidunt, sit amet faucibus libero imperdiet. Etiam varius
            posuere
            velit, et mattis augue mollis ac. Ut et magna risus.

            Aenean vitae vehicula urna. Cras mollis scelerisque ex sit amet fermentum. Pellentesque vestibulum orci id
            diam
            viverra ornare. Integer justo metus, aliquet vitae erat et, fermentum tincidunt sem. Pellentesque sit amet
            vehicula massa. Aliquam sollicitudin massa et metus auctor dictum. Curabitur sed porta est. Quisque vel
            fringilla lacus. Pellentesque ornare elit vitae orci mollis rutrum. In eget volutpat diam, in pulvinar sem.
            In
            eleifend dolor vitae est ultricies scelerisque. Ut arcu lorem, viverra non gravida non, pellentesque vel
            erat.
            In at ligula quis mauris mollis malesuada. Duis mattis finibus tellus vel viverra. Donec vulputate nisl ac
            quam
            ullamcorper, in bibendum ipsum pretium. In hac habitasse platea dictumst.

            In hac habitasse platea dictumst. Donec cursus congue magna, in tincidunt leo placerat congue. Suspendisse a
            semper augue. Phasellus est magna, rutrum ac pretium non, auctor eu enim. Vivamus ut vulputate diam. Nam
            dignissim varius efficitur. Quisque sollicitudin accumsan mi, a viverra quam vulputate in. Aenean at lacus
            lorem. In dictum lectus erat, sed lacinia libero scelerisque non. In dapibus felis nec felis pretium
            tristique.
            Phasellus in elementum magna, a scelerisque sem. Etiam non ligula id massa fermentum tincidunt sed at arcu.
            Pellentesque in ipsum non est faucibus sollicitudin. Praesent vitae nisl eu quam bibendum faucibus convallis
            quis sapien. Mauris ultrices pharetra efficitur. Sed blandit mattis tellus ac euismod.

            Ut pharetra turpis et orci facilisis, et pellentesque elit interdum. Duis suscipit eu ipsum varius accumsan.
            Mauris quis sagittis justo. Mauris ultricies quam ut mi fringilla bibendum. Pellentesque nibh felis,
            eleifend eu
            hendrerit sed, imperdiet non velit. Nam non auctor risus. Nunc porta urna a urna blandit lobortis. Donec id
            dolor egestas, interdum arcu sit amet, molestie nisi. Sed condimentum interdum augue, ac ullamcorper mi
            aliquam
            eget. Suspendisse a ultricies justo.

            Aenean blandit lobortis condimentum. Praesent facilisis massa elementum tortor hendrerit, quis consequat
            dolor
            lacinia. Cras suscipit rhoncus nulla, id fermentum diam posuere congue. Vivamus id est sed leo euismod
            interdum
            sed eget lorem. Vivamus sollicitudin nisl eget arcu ultrices, vel imperdiet ipsum pharetra. Aliquam eleifend
            mattis justo, ac tincidunt diam tincidunt et. Nullam fermentum sit amet nisi in consequat. Maecenas id nisl
            posuere, iaculis tellus in, iaculis libero.

            Proin consectetur gravida sapien eu sollicitudin. In lacus lorem, molestie sit amet egestas nec, facilisis
            ac
            lectus. Maecenas ultrices fringilla erat sed accumsan. Curabitur in dignissim leo. Duis viverra feugiat
            purus
            vel vulputate. Morbi elementum turpis ut est rhoncus, quis pretium augue rutrum. Duis est tortor,
            pellentesque
            non quam eu, malesuada semper mauris. Cras vehicula nisi vitae dui tincidunt, ut iaculis ante convallis.
            Integer
            ac feugiat sem, in tristique est. Vestibulum tempus ut orci vel pretium. Nullam ut purus magna. Maecenas vel
            lectus pulvinar, egestas est ac, pharetra neque. Vestibulum ac mauris nisi.

            Donec lacus magna, tristique id commodo vitae, accumsan sed ante. Maecenas ultricies tortor at ante semper
            efficitur. Cras commodo lobortis nulla non iaculis. Vivamus odio libero, condimentum quis erat mattis,
            euismod
            mattis purus. Duis sodales laoreet dolor, at rhoncus sem cursus et. Sed fermentum urna sit amet risus
            pulvinar,
            id aliquet lectus consequat. Etiam sed elementum nulla. Pellentesque ut justo placerat tortor convallis
            condimentum. Fusce gravida elementum tincidunt. Ut rhoncus commodo ligula aliquet bibendum. Suspendisse vel
            vulputate justo, et malesuada mauris. Nam elementum pharetra velit vitae laoreet. Nam luctus in eros vitae
            tristique. Donec iaculis lacus ac nunc rutrum, nec fermentum sem hendrerit. Aenean tincidunt felis vitae
            accumsan congue. Donec at suscipit massa, id luctus nunc.

            Aliquam finibus lacus vitae neque sollicitudin, sed posuere mauris convallis. Quisque eu posuere nulla.
            Aenean
            eu leo vitae mauris condimentum commodo ac vitae dui. Sed arcu ipsum, dictum vitae dui eget, tincidunt
            dignissim
            urna. Vestibulum id faucibus tortor. Proin venenatis et tortor id placerat. Suspendisse nulla odio, euismod
            suscipit interdum viverra, finibus sit amet orci. Etiam suscipit, sapien eget efficitur lacinia, sem ante
            sagittis ante, dignissim faucibus dui orci eleifend turpis. Sed a arcu sit amet augue interdum viverra.
            Donec
            ligula arcu, sollicitudin quis nisl eu, condimentum lacinia velit. In venenatis, orci sit amet egestas
            tincidunt, elit augue maximus dui, a pulvinar enim nunc in libero. Integer ipsum ex, suscipit in libero eu,
            cursus pulvinar libero. Curabitur placerat nisi eget augue faucibus posuere. In luctus turpis id metus
            bibendum,
            quis pulvinar lorem bibendum.

            Pellentesque euismod id nisl mollis aliquam. Phasellus sollicitudin quis nisi eu gravida. Phasellus dapibus,
            diam nec blandit varius, metus leo egestas lectus, vel feugiat tortor odio in sem. Praesent ut nulla
            scelerisque, dictum tellus sit amet, sagittis purus. Integer sed enim quam. Aenean non tincidunt nisi, non
            luctus tortor. Maecenas sodales, lacus quis pulvinar accumsan, lacus risus cursus risus, vitae hendrerit
            diam
            turpis a nisl. Ut aliquam eu ex bibendum luctus. Sed imperdiet nisl sit amet dolor eleifend, et ultricies
            ligula
            accumsan. Morbi ut porttitor magna. Aliquam erat volutpat.
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SearchItemsPage;