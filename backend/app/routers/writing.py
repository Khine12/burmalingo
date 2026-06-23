from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.routers.auth import get_current_user
from app.services import writing_quota
from app.services.writing_service import WritingService

router = APIRouter()

TOPICS = [
    # --- existing 15 ---
    "Some people believe that universities should focus on providing academic skills, while others think they should prepare students for employment. Discuss both views and give your own opinion.",
    "Many governments spend large amounts of money on art. Some people think this is a waste of resources, while others consider it a worthwhile investment. Discuss both views and give your opinion.",
    "The rise of online shopping has led to a decline in traditional retail stores. To what extent do you agree or disagree?",
    "In many countries, the gap between the rich and the poor is increasing. What causes this problem and what measures can be taken to reduce it?",
    "Some people argue that technology has made our lives more complicated. To what extent do you agree or disagree?",
    "Many young people today are choosing to live alone rather than in family groups. What are the advantages and disadvantages of this trend?",
    "Some people believe that children should be taught to be competitive, while others think cooperation is more important. Discuss both views and give your opinion.",
    "Tourism has brought many benefits to developing countries, but it has also caused problems. Discuss the advantages and disadvantages of international tourism in developing nations.",
    "It is better to live in a city than in the countryside. To what extent do you agree or disagree?",
    "Climate change is the most serious challenge facing humanity today. To what extent do you agree or disagree?",
    "Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better methods. Discuss both views and give your opinion.",
    "Advertising influences people's choices in a negative way. To what extent do you agree or disagree?",
    "Some experts believe that it is better for children to begin learning a foreign language at primary school rather than secondary school. Do the advantages of this outweigh the disadvantages?",
    "The increasing use of social media is having a negative effect on social interaction. To what extent do you agree or disagree?",
    "Many people today work from home instead of going to the office. What are the advantages and disadvantages of this trend for both employees and employers?",
    # --- health ---
    "Some people believe that governments should provide free healthcare for all citizens. Others argue that individuals should be responsible for funding their own healthcare. Discuss both views and give your opinion.",
    "The number of people who are overweight is increasing in many countries. What are the causes of this problem and what measures could be taken to address it?",
    "In many countries, people are choosing to have fewer children than in the past. What are the causes of this trend and what effects does it have on society?",
    # --- technology ---
    "Some people think that robots and artificial intelligence will eventually replace human workers entirely. To what extent do you agree or disagree?",
    "Many children spend a large amount of time using electronic devices. What are the possible effects of this on children's development, and how can parents limit screen time effectively?",
    "The internet has fundamentally changed the way people communicate with one another. Do you think the advantages of internet communication outweigh the disadvantages?",
    # --- education ---
    "Some people believe that university education should be free for all students, funded entirely by the government. Others argue that students should pay their own tuition fees. Discuss both views and give your opinion.",
    "Some people think schools should reward students who achieve the best academic results, while others believe it is more important to reward effort and improvement. Discuss both views and give your opinion.",
    "In many countries, traditional classroom learning is being replaced by online education. Do the advantages of online learning outweigh the disadvantages?",
    # --- environment ---
    "Some people believe that individuals can do very little to protect the environment and that it is mainly the responsibility of governments and large corporations. To what extent do you agree or disagree?",
    "Many species of plants and animals are becoming extinct. Some argue that money should be spent protecting them, while others say there are more pressing priorities. Discuss both views and give your opinion.",
    "The use of fossil fuels such as coal and oil is causing serious environmental damage. Some believe the only solution is a complete global switch to renewable energy. To what extent do you agree or disagree?",
    # --- government ---
    "Some people believe that governments should invest more money in public transport to reduce traffic congestion and pollution in cities. Others think individuals should solve the problem themselves. Discuss both views and give your opinion.",
    "In some countries, the government provides a universal basic income to all citizens regardless of whether they are employed. Do you think the advantages of this policy outweigh the disadvantages?",
    # --- media ---
    "Many newspapers and online media outlets publish stories about the private lives of celebrities. Some people think this is acceptable since they are public figures, while others argue everyone deserves privacy. Discuss both views and give your opinion.",
    "Some people believe that the media, including television, newspapers, and social media, has too much influence over the opinions and lifestyles of ordinary people. To what extent do you agree or disagree?",
    # --- globalisation ---
    "Some people argue that globalisation has brought significant economic benefits to developing countries. Others believe it has primarily benefited wealthy nations. Discuss both views and give your opinion.",
    "As a result of globalisation, many small local businesses are being forced to close because they cannot compete with large international companies. What problems does this cause and what can be done to support small businesses?",
    # --- crime ---
    "Some people think that providing young people with more leisure facilities such as sports centres and youth clubs is the best way to reduce youth crime. To what extent do you agree or disagree?",
    "Some people argue that the death penalty is never a justified punishment, while others believe it is appropriate for the most serious crimes. Discuss both views and give your opinion.",
    # --- family ---
    "In many societies, grandparents are increasingly taking on the role of primary caregiver for their grandchildren while parents go to work. What are the advantages and disadvantages of this arrangement?",
    # --- work ---
    "Some people think that employees should be allowed to choose their own working hours rather than following a fixed schedule set by the employer. Do the advantages of flexible working hours outweigh the disadvantages?",
]


class GradeRequest(BaseModel):
    topic: str
    essay: str


@router.get("/topics")
def get_topics():
    return [{"id": i, "text": t} for i, t in enumerate(TOPICS)]


@router.post("/grade")
def grade_essay(
    payload: GradeRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    word_count = len(payload.essay.split())
    if word_count < 50:
        raise HTTPException(status_code=422, detail="Essay must be at least 50 words")
    if payload.topic not in TOPICS:
        raise HTTPException(status_code=422, detail="Invalid topic")

    writing_quota.check_quota(user, db)
    result = WritingService.grade_essay(payload.topic, payload.essay)
    writing_quota.log_submission(user.id, db, kind="ielts")
    return result
