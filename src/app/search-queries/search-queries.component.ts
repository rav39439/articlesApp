import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';

@Component({
    selector: 'app-search-queries',
    templateUrl: './search-queries.component.html',
    styleUrls: ['./search-queries.component.scss']
})
export class SearchQueriesComponent implements OnInit {
    Tags: any
    Documents: any
    allArtclesdocs: any;
    allrr: any;
    sub: any[] = [];
    tagsinques: any;
    index = 0;
    text: any;
    ngOnInit(): void {
        this.getAllTags()
        this.getAlldocuments()
        setTimeout(() => {
            console.log(this.allArtclesdocs)

            console.log(this.Tags)

        }, 10000)
    }
    constructor(
        public afs: AngularFirestore
    ) {

    }



    async getAllTags() {
        const collectionRef = await this.afs
            .collection('articles').doc('tags').get().subscribe((d: any) => {
                console.log(d.data())
                this.Tags = d.data().Tags
            })
    }

    async getAlldocuments() {
        const collectionRef = await this.afs
            .collection('articles')
            .snapshotChanges();
        let sub = collectionRef.subscribe(
            (documentChanges: DocumentChangeAction<any>[]) => {
                documentChanges.forEach((change: any) => {
                    if (change.payload.doc.data().Articledata) {
                        this.allArtclesdocs = change.payload.doc.data().Articledata
                    }
                });
                this.sub.push(sub);
            }
        )
    }

    search() {
        let s1 = document.getElementById('Ans') as HTMLElement
        s1.innerHTML = ``
        let s2 = document.getElementById('queries') as HTMLInputElement
        let query = s2.value
        let arrayquery = query.split(' ')
        this.getTagsfromquery(arrayquery)
    }

    getTagsfromquery(queryarr) {
        let resultantDoc
        let upatedquery = queryarr.map(e => e.toLowerCase())
        let tagsTosearch = this.Tags.filter(t => upatedquery.includes(t.tag.toLowerCase()))
        let docArr = tagsTosearch.map(document => document.doc)
        resultantDoc = this.findMostRepeatedElement(docArr)
        this.showthisDoc(resultantDoc, tagsTosearch)

    }

    showthisDoc(resultdoc, tagsTosearch) {
        let html = ``
        let totaldocs: any = []
        let alltopicdetails = this.allArtclesdocs.map(e => e.Topicdetails.split(' '))
        let doci
        let tagsinques = tagsTosearch.map(e => e.tag)
        for (let i = 0; i < alltopicdetails.length; i++) {
            let result1 = this.containsAllWordsdet(tagsinques, alltopicdetails[i].filter(e => !e.includes('|')))
            let result2 = this.checkCommonelement(alltopicdetails[i].filter(e => e.includes('|')), tagsinques)
            if (result1 && result2) {
                totaldocs.push(this.allArtclesdocs[i])
                doci = this.allArtclesdocs[i]
            } else {
                doci = null
            }

        }
        let html1 = []
        let finalDocs: any = []
        if (typeof (totaldocs) != 'undefined' && totaldocs.length > 0) {
            totaldocs.forEach((e) => {
                let doc = e
                if (doc != null) {
                    let value = this.getExactAnsFromtext(doc, tagsTosearch, html1, finalDocs)[0]
                    let val = finalDocs
                     console.log(val)

                    if (typeof (val) != 'undefined') {
                        if (val.length != 0) {

                            if (finalDocs.length > 1) {
                                let allPercentages = finalDocs.map(e => e.pmatch)
                                let maxval = Math.max(...allPercentages)
                                let nindex = finalDocs.findIndex(e => e.pmatch == maxval)
                                html = finalDocs[nindex].html
                            }
                            else {
                                // console.log('finaldocs')
                                // console.log(finalDocs)
                                if(val[0]){
                                    html = val[0].html

                                }
                                else{
                                    html = '`<h1> Not found </h1>`'

                                }
                            }
                        }
                        else {
                            html = '`<h1> Not found </h1>`'

                        }
                    }
                    else {
                        html = '`<h1> Not found </h1>`'
                    }

                }
                else {
                    html = '`<h1> Not found </h1>`'
                }
            })
        }

        console.log(html)

        if (html.length != 0) {
            let s3 = document.getElementById('dd') as HTMLElement
            s3.innerHTML = html

        }

        else {
            let s4 = document.getElementById('dd') as HTMLElement
            s4.innerHTML = `<h1>Nothing found related to this</h1>`
        }

        let updatedHtml = this.getHTMLTags()
        console.log(updatedHtml)

        this.settext(updatedHtml)
        this.text = undefined
    }


    removeDuplicates(arr) {
        return arr.filter((value, index, self) => self.indexOf(value) === index);
    }

    getExactAnsFromtext(doc, tagsTosearch, html1, finalDocs) {
        let definedDocs = []

        let docs: any = []
        let newtags: any = []
        let filteredquestions: any = []
        doc.questions[0].split(',').forEach((e: any) => {
            filteredquestions.push(e.trim())
        })

        tagsTosearch.forEach((dc) => {
            if (filteredquestions.includes(dc.tag)) {
                newtags.push(dc)
            }
        })
        let arrayofTexts: any = []
        if (tagsTosearch.length > 0) {
            doc.Text.forEach((e) => {
                let s7 = document.getElementById('dd') as HTMLElement
                s7.innerHTML = e
                let s8 = document.getElementById('mmrg') as HTMLElement
                let text = s8.innerText
                arrayofTexts.push(text)
                docs.push(document.getElementById('mmrg'))
            })
            let wordstosearch = tagsTosearch.map(e => e.tag)
            let value1 = this.ArrwithAllwords(arrayofTexts, wordstosearch, doc.Text, docs, doc)
            let value2 = this.ArrwithAllwordsAlt(arrayofTexts, wordstosearch, doc.Text, docs, doc, definedDocs)
            //   console.log('final')
            //    console.log(value1)

            //   console.log(value2)
             console.log(definedDocs)
            if (typeof (value2) != 'undefined' && value1 !== null && value2 !== null &&
                typeof (value1) != 'undefined') {
                if (value1 != value2) {
                    // console.log("not equal")
                    let s5 = document.getElementById('sample') as HTMLElement
                    s5.innerHTML = value2
                    let s6 = document.getElementById('sample1') as HTMLElement

                    s6.innerHTML = value1

                    let d1 = document.getElementById('sample') as HTMLElement
                    let d2 = document.getElementById('sample1') as HTMLElement
                    if (d1.querySelector('p#mmrg') != null && d2.querySelector('p#mmrg') != null) {
                        let j1 = d1.querySelector('p#mmrg') as HTMLElement
                        let j2 = d2.querySelector('p#mmrg') as HTMLElement
                        let tags1 = j1.innerText.split(',')
                        let tags2 = j2.innerText.split(',')


                        //   let result1 = tags1.every(word => wordstosearch.includes(word));
                        //   let result2 = tags2.every(word => wordstosearch.includes(word));
                        let modData = this.removeDuplicates(wordstosearch)


                        let c1 = 0
                        let c2 = 0
                        modData.forEach((word) => {
                            if (tags1.includes(word.trim())) {
                                c2++
                            }
                        })

                        modData.forEach((word) => {
                            if (tags2.includes(word.trim())) {
                                c1++
                            }
                        })

                        if (c1 == c2) {
                            html1.push(value1)
                            finalDocs.push({html:value1,pmatch:100})

                        }
                        else if (c1 > c2) {

                            html1.push(value1)
                            finalDocs.push({html:value1,pmatch:100})
                        }
                        else {
                            html1.push(value2)
                            finalDocs.push(definedDocs[0])

                        }
                    }
                    else {
                    }
                }
                else {
                    html1.push()
                    finalDocs.push({html:value1,pmatch:100})

                }
            }

            else if ((typeof (value1) == 'string')
                && (typeof (value2) == 'undefined')) {
                html1.push(value1)
                finalDocs.push({html:value1,pmatch:100})
            }

            else if (typeof (value2) == 'string' && typeof (value1) == 'undefined') {
                html1.push(value2)
                finalDocs.push(definedDocs[0])
            }
            else {

            }

        } else {
            console.log("not in arary")
        }
        // console.log("end result")
        // console.log(html1)
        return html1


    }

    containsAllWords(wordString, wordsToSearch, counts) {
        let wordArray: any = []
        if (wordString.includes(',')) {
            wordString.split(',').forEach((e) => {
                wordArray.push(e.trim().toLowerCase())
            });

        }
        else {
            wordString.split(' ').forEach((e) => {
                wordArray.push(e.trim().toLowerCase())
            })

        }
        let nwordArr: any = []
        let optionalTag: any = []
        let optTag
        wordArray.forEach((word) => {
            if (word.includes('[')) {
                optTag = word.split('[')[1]
                nwordArr.push(optTag)
                optionalTag.push(optTag)
            }
            else {
                nwordArr.push(word)
            }
        })
        let filteredwords = this.removeDuplicates(wordsToSearch)
        // console.log(filteredwords)
        // console.log(nwordArr)

        //---------------percent match------------------//
        let count = 0
        let netLength = nwordArr.length - optionalTag.length
        filteredwords.forEach((word) => {
            if (nwordArr.includes(word)) {
                count++
            }
        })
        let percentagematch = Math.floor(count / netLength * 100)
        // console.log(percentagematch)

        counts.push({ tagscount: count, percentmatch: percentagematch })

        //-----------------------------------------------//
        //   if(percentagematch>45){
        //       return true
        //   }
        //   else{
        //       return false
        //   }
        return counts

        //return (wordsToSearch.every(word => wordArray.includes(word.toLowerCase())));
    }

    // Check each string of words

    ArrwithAllwords(arrayofTexts, wordsToSearch, htmlText, docs, doc) {
        for (let i = 0; i < arrayofTexts.length; i++) {
            //     console.log("the arrayoftext")
            // console.log(arrayofTexts[i])
            //let narrayofTexts=arrayofTexts[i].filter(e=>e.includes('['))

            if (this.containsAlternativewords(arrayofTexts[i], wordsToSearch)) {
                this.text = htmlText[i]
                // console.log(htmlText[i])
                break

            }

        }
        return this.text
    }

    ArrwithAllwordsAlt(arrayofTexts, wordsToSearch, htmlText, docs, doc, definedDocs) {
        let counts: any = []
        let countwithDoc: any = []

        for (let i = 0; i < arrayofTexts.length; i++) {

            if (this.containsAllWords(arrayofTexts[i], wordsToSearch, counts)) {
                // this.text = htmlText[i]
                //  break

            }
        }
        let ncount = counts.map(e => e.tagscount)

        let b = Math.max(...ncount)
        let index = ncount.findIndex(e => e == b)
        let da=counts.filter(e=>e.tagscount==b)
      let percentageelems=da.map(ele=>ele.percentmatch)
      let bw = Math.max(...percentageelems)
    //   console.log(bw)

      let newindex=counts.findIndex(elem=>elem.percentmatch==bw)
    //   console.log(newindex)
    //   console.log(counts[newindex])

      if(newindex>-1){
        index=newindex
      }
        if (b > 0) {
            if (b < 4) {

                if (counts[index].percentmatch > 45) {

                    this.text = htmlText[index]
                    definedDocs.push({ pmatch: counts[index].percentmatch, html: htmlText[index] })

                }
            }
            else {
                this.text = htmlText[newindex]
                definedDocs.push({ pmatch: counts[index].percentmatch, html: htmlText[index] })

            }
        }
        else {
            this.text = 'Not found'
        }
        let ntext
        let allPercentages = definedDocs.map(e => e.pmatch)
        let maxval = Math.max(...allPercentages)
        let nindex = definedDocs.findIndex(e => e.pmatch == maxval)
        //   console.log(allPercentages)
        //   console.log(maxval)
        //   console.log(nindex)
        if (nindex > -1) {

            ntext = definedDocs[nindex].html
            this.text = ntext

        }
        else {
            ntext = ''
        }
        countwithDoc.push({ count: b, docum: htmlText[newindex] })


        //console.log(this.text)


        return this.text
    }



    findMostRepeatedElement(arr) {
        // Create an object to store the frequency of each element
        const frequencyMap = {};

        // Initialize variables to keep track of the most repeated element and its frequency
        let mostRepeatedElement;
        let maxFrequency = 0;

        // Iterate through the array and update the frequency map
        for (const element of arr) {
            if (frequencyMap[element]) {
                frequencyMap[element]++;
            } else {
                frequencyMap[element] = 1;
            }

            // Check if the current element has a higher frequency than the previous most repeated element
            if (frequencyMap[element] > maxFrequency) {
                mostRepeatedElement = element;
                maxFrequency = frequencyMap[element];
            }
        }

        return mostRepeatedElement;
    }

    hasDuplicates(array) {
        const uniqueValues = new Set(); // Use a Set to store unique values

        for (const item of array) {
            if (uniqueValues.has(item)) {
                return true; // Found a duplicate
            }
            uniqueValues.add(item);
        }

        return false; // No duplicates found
    }

    containsAllWordsdet(userTags, documentTags) {
        let contain1 = true
        // console.log("document tags")
        // console.log(documentTags)
        let updatedUsertags = userTags.map(e => e.toLowerCase())
        if (documentTags.length != 0) {
            for (let i = 0; i < documentTags.length; i++) {
                if (updatedUsertags.indexOf(documentTags[i].toLowerCase()) === -1) {
                    contain1 = false
                    // return false;
                }
            }
        } else {
            contain1 = true
        }
        return contain1;
    }


    settext(wordArray) {
        let s9 = document.getElementById('Ans') as HTMLElement
        s9.classList.add('newclass')
        let html = ``
        for (let i = 0; i < wordArray.length; i++) {
            html += wordArray[i]
            setTimeout(() => {
                s9.innerHTML = s9.innerHTML + wordArray[i];
            }, i * 50); // Delay each word by i seconds
        }

    }


    //   extractTextFromHTML(htmlString) {
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(htmlString, 'text/html');

    //     const textNodes = [];

    //     function extractText(node) {
    //         if (node.nodeType === Node.TEXT_NODE) {
    //             textNodes.push(node.textContent);
    //         } else if (node.nodeType === Node.ELEMENT_NODE) {
    //             const children = node.childNodes;
    //             for (let i = 0; i < children.length; i++) {
    //                 extractText(children[i]);
    //             }
    //         }
    //     }

    //     extractText(doc.body);
    //     return textNodes.join(' ');
    // }


    getHTMLTags() {
        const divElement = document.getElementById('dd') as HTMLElement;
        const pTagsArray: any = [];
        const pElement = document.getElementById('mmrg');
        if (pElement && pElement.parentNode === divElement) {
            divElement.removeChild(pElement);
        }
        if (divElement) {
            const allTags = divElement.getElementsByTagName('*'); // Get all tags within the div
            for (let i = 0; i < allTags.length; i++) {
                const tag: any = allTags[i];
                const nonBreakingSpace = '&nbsp'; // Non-breaking space
                let pt = ``
                if (tag.nodeName.toLowerCase() === 'p') {
                    let lineBreak = document.createElement('br');
                    tag.appendChild(lineBreak);

                    tag.textContent.split(' ').forEach((el) => {
                        let html = `<p>${el}</p>`
                        var newText = el.replace(/\u00A0/g, "");
                        pTagsArray.push(newText + ' ');
                    })
                }

                else if (tag.nodeName.toLowerCase() === 'h1' || tag.nodeName.toLowerCase() === 'h2' || tag.nodeName.toLowerCase() === 'h3') {
                    let html = `<h2>${tag.textContent}</h2>`
                    pTagsArray.push(html + ' ');

                }

                else if (tag.nodeName.toLowerCase() === 'div') {

                    if (allTags[i].id === 'mmrg') {
                        const targetDiv: any = allTags[i];

                        // Find and remove the p tag with id "mmrg" inside that div
                        const pElement = targetDiv.getElementById('#mmrg') as HTMLElement;
                        if (pElement) {
                            targetDiv.removeChild(pElement);
                        }
                    }
                }

                else if (tag.nodeName.toLowerCase() === 'li') {

                }

                else if (tag.nodeName.toLowerCase() === 'span') {


                }
                else if (tag.nodeName.toLowerCase() === 'code') {


                }
                else if (tag.nodeName.toLowerCase() === 'section') {


                }


                else if (tag.nodeName.toLowerCase() === 'pre') {
                    tag.textContent.split(' ').forEach((el, index) => {
                        let html = `<p>${el}</p>`

                        pTagsArray.push(el + ' ');

                    })
                }

                else {

                    pTagsArray.push(tag.outerHTML);
                }
            }

        } else {
        }
        return pTagsArray
    }


    checkCommonelement(arr, arr1) {
        let result = false
        if (arr.length != 0) {
            arr.forEach((elem) => {
                let checArr = elem.split('|')

                if (this.hasCommonElement(checArr, arr1)) {

                    result = true
                }

            })
        } else {
            result = true
        }
        return result
    }

    hasCommonElement(arr1, arr2) {
        let updatedarr2 = arr2.map(e => e.toLowerCase())
        for (let element of arr1) {
            if (updatedarr2.includes(element.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    containsAlternativewords(wordString, wordsToSearch) {
        let wordArray: any = []
        if (wordString.includes(',')) {
            wordArray = wordString.split(',');

        }
        else {
            wordArray = wordString.split(' ')
        }
        let nwordArray = wordArray.filter(e => !e.includes('['))

        return nwordArray.every(word => wordsToSearch.includes(word));
    }



}
