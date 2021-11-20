             function queryArtist() {
                let params = (new URL(document.location)).searchParams;
                if (params.has('artist')) {
                    let artistName = params.get('artist');
                    httpGET("artist?query="+artistName, getMBID);
                }
            }

            function httpGET(Url3, cbFunction) {
                let mbBaseURL = "https://musicbrainz.org/ws/2/";
                let OthernameforURL = mbBaseURL + Url3;
                let xmlHttp = new XMLHttpRequest();
                xmlHttp.open("GET", OthernameforURL);
                    xmlHttp.send();

                    xmlHttp.onreadystatechange = function () {
                        if(this.readyState==4 && this.status==200) {
                            cbFunction(this);
                        }
                    };
            }

            function getMBID(xhttp) {
                let retrievedData=xhttp.responseXML;
                let aData = retrievedData.getElementsByTagName("artist")[0];
                let adataMBID = aData.id;
                let artistCountry = aData.getElementsByTagName('country')[0].innerHTML;
                let artistName = aData.getElementsByTagName('name')[0].innerHTML;

               
                httpGET("release-group?artist="+adataMBID+"&type=album|ep", getReleases);
                
            }
//Retrieve data from musicbrainz into table//
            function getReleases(xhttp) {
                let retrievedData=xhttp.responseXML;
                releases=retrievedData.getElementsByTagName("release-group");
                let placeholder = document.getElementById('placeholder');
                let tableHTML = 
                `
                    <table>
                            <tr>
                                <th>Album Name</th>
                                <th>Released:</th>
                            </tr>
                `; 
                let albums;
                let albumName;
                let releaseDate;
                for(row=0; row<releases.length;row++)
                {
                    Albums = releases[row];
                    albumName = Albums.getElementsByTagName("title")[0].innerHTML;
                    releaseDate = Albums.getElementsByTagName("first-release-date")[0].innerHTML;
                    tableHTML += 
                    `
                    <tr>
                        <td>${albumName}</td>
                        <td>${releaseDate}</td>
                    </tr>
                    `;
                }
                
                tableHTML += `
                </table>
                `;
                placeholder.innerHTML = tableHTML;

            }
//Call main function//
            window.onload = queryArtist;
  