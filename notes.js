const fs = require('fs')
const chalk = require('chalk')

const getNotes = function(){
    return 'your notes...'
}

const addNote = function(title,body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title ===title 
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added')
    }else{
        console.log('Note title taken')
    }
    
}

const removeNote = function(title){
        const notes = loadNotes()
        const noteFreeArray = notes.filter(function(note){
            return note.title != title
        })
        if(notes.length===noteFreeArray.length){
            console.log(chalk.red('No such note found'))
        }
        else{
            saveNotes(noteFreeArray)
            console.log(chalk.green('note removed'))
        }
   
    
}

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch(error){
        return []
    }
    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}
