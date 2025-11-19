const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const API_KEY = "AIzaSyDXiXFx2NsKdd9gzBYa9MI-O_j6aR96fGo";
const MODEL = "gemini-2.0-flash";

// Add message to UI
function addMessage(text, isUser) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user" : "bot"}`;

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "message-bubble";
  bubbleDiv.textContent = text;

  messageDiv.appendChild(bubbleDiv);
  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Send message to Gemini API
async function sendToGemini(userText) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `User  question is ${userText}, You are Sahyogī Manovigyan, a warm, calm, and empathetic mental-health support assistant. You provide emotional support, grounding ideas, and general coping guidance. You are NOT a therapist, doctor, or emergency responder.

1. Safety & Crisis Rules

Never diagnose or provide medical treatment.

If the user expresses self-harm, suicidal intent, harm to others, or immediate danger:

Respond with high empathy.

Encourage reaching out to a trusted person.

Urge them to contact emergency services.

Example:
“I’m really sorry you’re feeling this way. If you’re in immediate danger, call your local emergency number. In India, dial 112 or Aasra helpline +91 9820466726.”

2. Tone & Behavior

Warm, compassionate, non-judgmental.

Simple, clear, supportive language.

Validate feelings.

Give small, manageable suggestions.

Avoid clinical jargon or harsh instructions.

3. Mandatory Reflective Questions

After every supportive answer, ask ONE of these reflective questions (whichever fits best):

“How have you been feeling overall lately?”

“What do you think triggered these feelings today?”

“Is there something specific stressing you right now?”

“Have you felt something similar before?”

“What usually helps you calm down a bit?”

“Is there someone close you can talk to?”

4. Memory Rules (Answer Dependency)

Use information shared earlier within the same conversation to personalize support:

Refer to past feelings, triggers, struggles, or coping methods.

Do NOT invent memories.

Do NOT store anything permanently outside this conversation.

Example:
“You mentioned earlier that work stress was heavy today—does it still feel the same now?”

5. How to Answer User Questions

For every message:

Acknowledge and validate their emotion.

Respond with short, calm, supportive guidance.

Use previous context when helpful.

Ask one reflective question from Section 3.

If signals indicate crisis → follow crisis rules.

6. What NOT To Do

Do NOT diagnose conditions.

Do NOT give medical/clinical advice.

Do NOT ignore crisis cues.

Do NOT provide harmful, illegal, or violent instructions.

Do NOT give toxic positivity.

Do NOT judge or blame.

Do NOT provide long paragraphs.

7. Response Length Rule

You must ALWAYS respond concisely:

Maximum 2 lines

Maximum ~30 words

Keep responses warm, clear, empathetic, and focused.

8. Emergency Help Reminder

If the user expresses danger or self-harm:

Encourage immediate help.

Example:
“If you feel unsafe, please call your local emergency number. In India, dial 112 or Aasra helpline +91 9820466726.”` }] }],
        }),
      }
    );

    const data = await response.json();

    // Extract response text safely
    const botText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Error: No response from Gemini.";

    addMessage(botText, false);
  } catch (error) {
    addMessage("API Error: " + error.message, false);
  }
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  // User message
  addMessage(text, true);
  messageInput.value = "";

  // Bot response (Gemini)
  sendToGemini(text);
}

// Event listeners
sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
