import math

f = open("unionLawSpreadSheet.csv", "r")
lines = f.readlines()

states = ('Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming')

fIds = open("us-state-names.tsv", "r")
stateNameList = fIds.readlines()

newLines = ["StateName,id," + lines[0].strip()]
for line in lines[1:]:
    columns = line.split(",")
    if columns[0].strip() == "" or len(columns) < 1:
        continue
    newCols = [states[int(columns[0]) - 1]]
    id = "-1"
    for stateNameLine in stateNameList:
        stateName = stateNameLine.split("\t")
        if stateName[2].strip() == newCols[0].strip():
            id = stateName[0].strip()
    newCols.append(id)
    for col in columns:
        if col.strip() == "":
            newCols.append(-1)
        else:
            newCols.append(math.floor(float(col.strip())))
    newLines.append(",".join(str(v) for v in newCols))

fout = open("unionLawsProcessed.csv", "w")
for line in newLines:
    fout.write(line)
    fout.write("\n")
fout.close()
